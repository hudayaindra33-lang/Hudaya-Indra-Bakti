import React, { useState, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Course, Lesson } from '../types';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import PlusIcon from '../components/icons/PlusIcon';
import PencilIcon from '../components/icons/PencilIcon';
import TrashIcon from '../components/icons/TrashIcon';
import SparklesIcon from '../components/icons/SparklesIcon';
import { generateCourseDescription } from '../services/geminiService';
// FIX: Added missing import for XIcon component.
import XIcon from '../components/icons/XIcon';

const AdminDashboard: React.FC = () => {
    const { courses, addCourse, updateCourse, deleteCourse } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    const handleOpenModal = (course?: Course) => {
        setEditingCourse(course || null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCourse(null);
    };
    
    const handleDelete = (courseId: string) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            deleteCourse(courseId);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300"
                >
                    <PlusIcon className="w-5 h-5" />
                    Create Course
                </button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Lessons</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-sm text-gray-500">{course.lessons.length}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-4">
                                        <button onClick={() => handleOpenModal(course)} className="text-primary-600 hover:text-primary-900"><PencilIcon className="w-5 h-5"/></button>
                                        <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-900"><TrashIcon className="w-5 h-5"/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <CourseForm
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    course={editingCourse}
                    onSave={(c) => {
                        if(editingCourse) {
                            updateCourse(c as Course);
                        } else {
                            addCourse(c);
                        }
                    }}
                />
            )}
        </div>
    );
};

interface CourseFormProps {
    isOpen: boolean;
    onClose: () => void;
    course: Course | null;
    onSave: (course: Omit<Course, 'id' | 'imageUrl' | 'lessons'> & { lessons: Omit<Lesson, 'id'>[] } | Course) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ isOpen, onClose, course, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [lessons, setLessons] = useState<Array<Omit<Lesson, 'id'>>>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (course) {
            setTitle(course.title);
            setDescription(course.description);
            setLessons(course.lessons);
        } else {
            setTitle('');
            setDescription('');
            setLessons([{ title: '', content: '', type: 'text' }]);
        }
    }, [course]);

    const handleLessonChange = <K extends keyof Omit<Lesson, 'id'>>(index: number, field: K, value: Omit<Lesson, 'id'>[K]) => {
        const newLessons = [...lessons];
        newLessons[index] = { ...newLessons[index], [field]: value };
        setLessons(newLessons);
    };

    const addLesson = () => {
        setLessons([...lessons, { title: '', content: '', type: 'text' }]);
    };

    const removeLesson = (index: number) => {
        setLessons(lessons.filter((_, i) => i !== index));
    };

    const handleGenerateDescription = async () => {
        if (!title) {
            alert('Please enter a course title first.');
            return;
        }
        setIsGenerating(true);
        try {
            const generatedDesc = await generateCourseDescription(title);
            setDescription(generatedDesc);
        } catch (error) {
            console.error('Failed to generate description:', error);
            alert('An error occurred while generating the description.');
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const courseData = { title, description, lessons };
        if (course) {
             onSave({ ...course, ...courseData });
        } else {
             onSave(courseData);
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={course ? 'Edit Course' : 'Create Course'}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Course Title</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <div className="relative">
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                        <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="absolute bottom-2 right-2 flex items-center gap-1.5 text-xs bg-primary-100 text-primary-700 font-semibold py-1 px-2 rounded-md hover:bg-primary-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isGenerating ? <Spinner size="sm"/> : <SparklesIcon className="w-4 h-4" />}
                            <span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
                        </button>
                    </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 border-t pt-4">Lessons</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {lessons.map((lesson, index) => (
                        <div key={index} className="p-4 border rounded-md bg-gray-50 relative">
                             <button type="button" onClick={() => removeLesson(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><XIcon className="w-4 h-4"/></button>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Lesson Title</label>
                                    <input type="text" value={lesson.title} onChange={e => handleLessonChange(index, 'title', e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Type</label>
                                    <select value={lesson.type} onChange={e => handleLessonChange(index, 'type', e.target.value as 'text' | 'video')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                                        <option value="text">Text</option>
                                        <option value="video">Video URL</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea value={lesson.content} onChange={e => handleLessonChange(index, 'content', e.target.value)} rows={3} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" placeholder={lesson.type === 'video' ? 'https://youtube.com/watch?v=...' : 'Enter lesson content here...'}/>
                            </div>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={addLesson} className="text-sm font-medium text-primary-600 hover:text-primary-800">+ Add Lesson</button>

                <div className="flex justify-end gap-4 border-t pt-4">
                    <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Cancel</button>
                    <button type="submit" className="bg-primary-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Save Course</button>
                </div>
            </form>
        </Modal>
    );
}

export default AdminDashboard;
