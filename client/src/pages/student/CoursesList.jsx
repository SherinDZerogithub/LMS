import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar';
import { useParams } from 'react-router-dom';
import CourseCard from '../../components/student/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../components/student/Footer';


const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams(); // Fixed: useParams is a function

  // State to store filtered courses
  const [filteredCourses, setFilteredCourses] = useState([]);

  
  // Filter courses based on input
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      if (input) {
        setFilteredCourses(
          tempCourses.filter((item) =>
            item.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        );
      } else {
        setFilteredCourses(tempCourses);
      }
    }
  }, [allCourses, input]); // Added input to dependency array

  return (
    <>
      <div className='relative md:px-8 pt-20 text-left'>
        {/* Flex container to align items in a row */}
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-6'>
          {/* Left side: h1 and p */}
          <div>
            <h1 className='text-4xl font-semibold text-gray-500'>Course List</h1>
            <p className='text-gray-500'>
              <span
                className='text-blue-600 cursor-pointer'
                onClick={() => navigate('/')}
              >
                Home
              </span>{' '}
              / <span  className='cursor-pointer' onClick={() => navigate('/course-list')} >Courses List</span>
            </p>
          </div>

          {/* Right side: SearchBar */}
          <div className='w-full md:w-auto'>
            <SearchBar data={input} />
          </div>
        </div>
        {
          input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600'>
            <p> {input} </p>
            <img src={assets.cross_icon} alt='cross' className='cursor-pointer'
            onClick={()=>navigate('/course-list')} />
          </div>
        }



        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0'>
          {filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CoursesList