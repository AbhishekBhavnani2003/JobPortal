
import { useState, useEffect } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Token from './Token'
import { useNavigate } from 'react-router-dom'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import Footer from './Footer'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const initialpost = {
    category: '',
    title: '',
    description: '',
    experience: '',
    gender: '',
    agegroup:
    {
        from: '',
        to: '',
    },
    audition:
    {
        venue: '',
        date: '',
        time: null
    }

}

export default function Example() {

    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    const [category, setCategory] = React.useState('');
    const [gender, setgender] = useState('')
    const [post, setPost] = useState(initialpost);

    const navigate = useNavigate()


    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleform = (e) => {

        if (!e || !e.target) {
            console.error('Event or target is null');
            return;
        }
        const { name, value } = e.target
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
        if (name === "category") {
            setCategory(value);
        }
        if (name === 'gender') {
            setgender(value)
        }
        if (name.startsWith('agegroup')) {
            const key = name.split('.')[1];
            setPost((prevPost) => ({
                ...prevPost,
                agegroup: {
                    ...prevPost.agegroup,
                    [key]: value,
                },
            }));
        }

        if (name.startsWith('audition')) {
            const key = name.split('.')[1];
            setPost((prevPost) => ({
                ...prevPost,
                audition: {
                    ...prevPost.audition,
                    [key]: value,
                },
            }));
        }

    }



    const handleTimeChange = (newValue) => {
        setPost((prevPost) => ({
            ...prevPost,
            audition: {
                ...prevPost.audition,
                time: newValue,
            },
        }));
    };


    const savePost = async (event) => {
        event.preventDefault();
        const token = Token();
        const createdby = sessionStorage.getItem("name");
        const postWithUsername = {
            ...post,
            createdby: createdby,
        };
        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/newpost",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: ` ${token}`,
                    },
                    body: JSON.stringify(postWithUsername),
                }
            );

            if (response.ok) {
                console.log("Post saved successfully");
                navigate("/jobs");
            } else {
                console.error("Failed to save post:", response.statusText);
                const result = await response.json();
                console.error("Error response:", result);
            }
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };


    return (
        <>
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                aria-hidden="true"
                style={{
                    marginTop: '500px',
                    display: 'none'
                }}
            >
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        marginTop: '100px'
                    }}
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h4 className="text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">Hire a best fit for your requirement with JobPilot</h4>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    All casting requirements at one place
                </p>
            </div>



            <form onSubmit={savePost} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className='sm:col-span-2'>
                        <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
                            Title
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="title"
                                id="title"
                                autoComplete="given-title"
                                onChange={handleform}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>


                    <div style={isDesktop ? { display: 'flex' } : { display: 'block' }}>

                        <Box sx={{ minWidth: 250 }} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='category'
                                    value={category}
                                    label="category"
                                    onChange={handleform}
                                >
                                    <MenuItem value={"Actor"}>Actor</MenuItem>
                                    <MenuItem value={"Singer"}>Singer</MenuItem>
                                    <MenuItem value={"Dancer"}>Dancer</MenuItem>
                                    <MenuItem value={"Editor"}>Editor</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{
                            minWidth: 250,
                            ...(isDesktop ? { marginLeft: '75px' } : { marginTop: '20px' })
                        }}>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    label="Gender"
                                    name='gender'
                                    onChange={handleform}

                                >
                                    <MenuItem value={"male"}>Male</MenuItem>
                                    <MenuItem value={'female'}>Female</MenuItem>
                                    <MenuItem value={"others"}>Others</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <div className='sm:col-span-2'>
                        <label htmlFor="experience" className="block text-sm font-semibold leading-6 text-gray-900">
                            Experience required
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="number"
                                name="experience"
                                id="experience"
                                min={0}
                                onChange={handleform}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div style={isDesktop ? { display: 'flex', flexDirection: 'column' } : undefined}>
                        <label htmlFor="agegroup" className="block text-sm font-semibold leading-6 text-gray-900">
                            Age
                        </label>
                        <label htmlFor="from" className="block text-sm font-semibold leading-6 text-blue-900" style={{ textAlign: 'left' }}>
                            From
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="number"
                                name="agegroup.from"
                                id="agegroup.from"
                                min={18}
                                style={isDesktop ? { padding: '15px' } : { padding: '5px' }}
                                onChange={handleform}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <label htmlFor="to" className="block text-sm font-semibold leading-6 text-blue-900" style={{ textAlign: 'left', marginTop: '3px' }}>
                            To
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="number"
                                name="agegroup.to"
                                id="agegroup.to"
                                min={18}
                                style={isDesktop ? { padding: '15px' } : { padding: '5px' }}
                                onChange={handleform}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                    </div>

                    <div>
                        <label htmlFor="audtion" className="block text-sm font-semibold leading-6 text-gray-900">
                            Audtion
                        </label>



                        <label htmlFor="venue" className="block text-sm font-semibold leading-6 text-blue-900" style={{ textAlign: 'left' }}>
                            Venue
                        </label>

                        <div className="mt-2.5">
                            <textarea
                                type="text"
                                name="audition.venue"
                                id="audition.venue"
                                rows={3}
                                onChange={handleform}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <label htmlFor="venue" className="block text-sm font-semibold leading-6 text-blue-900" style={{ textAlign: 'left', marginTop: '10px' }}>
                            Date
                        </label>

                        <div className="mt-2.5">
                            <input
                                type="Date"
                                name="audition.date"
                                id="audition.date"
                                onChange={handleform}
                                rows={3}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <label htmlFor="time" className="block text-sm font-semibold leading-6 text-blue-900" style={{ textAlign: 'left', marginTop: '10px' }}>
                            Time
                        </label>

                        <div className="mt-2.5">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker
                                        label="Audition Time"
                                        value={post.audition.time ? dayjs(post.audition.time) : null} // Ensure the value is a dayjs object
                                        onChange={(newValue) => handleTimeChange(newValue)}
                                        sx={{ width: '100%' }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>

                    </div>


                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
                            Description
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                name="description"
                                id="description"
                                rows={4}
                                onChange={handleform}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
        <Footer/>
        </>
    )
}
