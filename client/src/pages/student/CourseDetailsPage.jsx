import React, { useContext, useEffect, useState } from 'react'
import CourseCard from '../../components/student/CourseCard'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Footer from '../../components/student/Footer'
import YouTube from 'react-youtube'
const CourseDetailsPage = () => {

  const { id } = useParams(); // Get the course ID from the URL
  const [courseData, setCourseData] = useState(null); // State to store course details
  const [openSection, setOpenSection] = useState({}); // initialize with empty object
  const [isAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const { allCourses, calculateRating, calculateChapterTime, currency, calclulateCourseDuration , 
    calculateNumberOfLectures} = useContext(AppContext); // Access context values
  // Fetch course data based on the ID
  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id); // Find the course by ID
    setCourseData(findCourse); // Set the course data
  };
  // Fetch course data when the component mounts or when `allCourses` or `id` changes
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      fetchCourseData(); // Call the fetch function
    }
  }, [allCourses, id]); // Add `allCourses` and `id` as dependencies
  const toggleSection = (index) =>{
    setOpenSection((previousValue)=>(
      {...previousValue, [index]: !previousValue[index]}
    ))
  }
  return courseData? (
    <>
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between 
    md:px-36 px-8 md:pt-30 pt-20 text-left*'>
      <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100' >
         </div>
      {/*left column */}
      <div className='max-w-xl z-10 text-gray-500 text-left' >
        <h1 className='md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800'> {courseData.courseTitle} </h1>
        <div
            className='text-gray-600 pt-4 md:text-base text-sm' // Use `prose` for better text formatting (if using Tailwind CSS Typography)
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }} // Render HTML content
          ></div>

          {/* review and ratings keys= ctrl+k+c */}
           <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
                    <p className='cursor-pointer' > {calculateRating(courseData)} </p>
                    <div className='flex'>
                      {[...Array(5)].map((_, i) => (
                        <img key={i} src={ i< Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank  }
                         alt='star' className='cursor-pointer w-3.5 h-3.5' />
                      ))}
                    </div>
                    <p className='text-cyan-600'> ({courseData.courseRatings.length} &nbsp;
                      {courseData.courseRatings.length === 1 ? 'Review' : 'Reviews'})
                       </p>
                       <p> Enrolled Students: {courseData.enrolledStudents.length} 
                        {courseData.enrolledStudents.length === 1 ? ' Student' : ' Students'}
                       </p>

                  </div>
                  <p className='text-sm' > Corse by  <span className='text-cyan-600 underline' >Great Stack</span> </p>
            {/* Course structure */}
          <div className='pt-8 text-gray-800'>
            <h2 className='font-semibold text-xl'>Course Structure</h2>
            <div className='pt-5'>
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>


                  <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={()=>toggleSection(index)}>
                    <div className='flex items-center gap-2'>
                      <img className={`transform transition-transform ${openSection[index]? 'rotate-180': 'rotate-0'}`}
                       src={assets.down_arrow_icon} alt='arrow'  />
                      <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                    </div>
                    <p className='text-sm md:text-default'>
                      {chapter.chapterContent.length} Lectures - {calculateChapterTime(chapter.chapterContent)}
                    </p>
                  </div>

                  <div className={`overflow-hidden translate-all duration-300 ${openSection[index]? 'max-h-96' : 'max-h-0'} `}>
                    <ul className='list disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                      {chapter.chapterContent.map((lecture, index) => (
                        <li key={index} className='flex items-start gap-2 py-1' >
                          <img src={assets.play_icon} alt="play" className='w-4 h-4 mt-1' />
                          <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default' >
                            <p> {lecture.lectureTitle} </p>
                            <div className='flex gap-2'>
                              {lecture.isPreviewFree && <p
                              onClick={()=> setPlayerData({videoId: lecture.lectureUrl.split('/').pop() }) }
                               className='text-cyan-600 cursor-pointer'>Preview</p> }
                              <p> {humanizeDuration(lecture.lectureDuration* 60 * 1000, { units: ['h', 'm']})} </p>

                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              ))}
            </div>
          </div>
          {/* course Description =>ctrl + (k+c) */}

          <div className='py-20 text-sm md:text-default' >
            <h3 className='text-xl font-semibold text-gray-800' >Course Description</h3>
            <div
            className='text-gray-600 pt-4 md:text-base text-sm rich-text' // Use `prose` for better text formatting (if using Tailwind CSS Typography)
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription }} // Render HTML content
          ></div>

          </div>
      </div>
      {/*rigth colomn */}
      <div className='max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]'>
      {playerData ? (
        <YouTube
          videoId={playerData.videoId}
          opts={{
            playerVars: {
              autoplay: 1, // Autoplay the video
            },
          }}
          iframeClassName='w-full aspect-video' // Correctly placed iframeClassName
        />
      ) : (
        <img src={courseData.courseThumbnail} alt="course-image" />
      )}
       
        <div className='p-5 '>
          <div className='flex items-center gap-2' >

          <img src={assets.time_left_clock_icon} alt='time-left-clock' className='w-3.5' />
           
            <p className='text-red-500'> <span className='font-medium' >5 Days</span> left at this price!</p>
          </div>
          <div className='flex gap-3 items-center pt-2'>
            <p className='text-gray-800 md:text-4xl text-2xl font-semibold' > {currency} {(courseData.coursePrice - courseData.discount * courseData.coursePrice /100).toFixed(2) } </p>
            <p className='md:text-lg text-gray-500 line-through' > {currency} {courseData.coursePrice} </p>
            <p className='md:text-lg text-gray-500 ' > {courseData.discount}% off  </p>
          </div>
          <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500 '>
            <div className='flex items-center gap-1' >
              <img src={assets.star} alt="star" />
              <p> {calculateRating(courseData)} </p>
            </div>
            <div className='h-4 w-px bg-gray-400'></div>
            <div className='flex items-center gap-1' >
              <img src={assets.time_clock_icon} alt="clock" />
              <p> {calclulateCourseDuration(courseData)} </p>
            </div>
            <div className='h-4 w-px bg-gray-400'></div>
            <div className='flex items-center gap-1' >
              <img src={assets.lesson_icon} alt="lesson" />
              <p> {calculateNumberOfLectures(courseData)}  Lessons </p>
            </div>


          </div>
          
          
          <button className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white ' 
          > {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now' } </button>

          <div className='pt-6'>
            <p className='md:text-xl text-lg font-medium text-gray-800' >What's in the Course</p>
            <ul className='ml-4 pt-2 text-sm md:text-default list-disc text-gray-500'>
              <li>Lifetime access with free updates</li>
              <li>Step by Step, hands on project guidance</li>
              <li>Downloadable resources and source code</li>
              <li>Quizess to test your knowledge</li>
              <li>Certification of completion.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  ) : <Loading/>
}

export default CourseDetailsPage