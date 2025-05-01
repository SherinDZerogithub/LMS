import { useEffect, useState, createContext } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
// Create the AppContext
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([])

  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);

  };

  //function to calculate average rating of courses
  //average rating of this course is 0
  // if there is no review or rating on the course return 0
  const calculateRating = (course) =>{
    if(course.courseRatings.length === 0){
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach(rating=> {
      //this will add all the rating of each review
      //person1 -5 person2-4 
      //output= 4+5 =9
      totalRating += rating.rating;

    })
    //average rating
    return totalRating/ course.courseRatings.length
  }

  //function to calculate course chapter type
 // Function to calculate chapter duration
 const calculateChapterTime = (chapter) => {
  let time = 0;
  chapter.forEach((lecture) => (time += lecture.lectureDuration));
  return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
};

// Function to calculate course duration
const calclulateCourseDuration = (course) => {
  let time = 0;
  course.courseContent.forEach((chapter) => {
    chapter.chapterContent.forEach((lecture) => (time += lecture.lectureDuration));
  });
  return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
};

// Function to calculate number of lectures
const calculateNumberOfLectures = (course) => {
  let totalLectures = 0;
  course.courseContent.forEach((chapter) => {
    if (Array.isArray(chapter.chapterContent)) {
      totalLectures += chapter.chapterContent.length;
    }
  });
  return totalLectures;
};


  const fetchUserEnrolledCourses = async() => {
    setEnrolledCourses(dummyCourses)
  }
  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);

  const value = {
    currency,
    allCourses,
     navigate,
    calculateRating,
    isEducator, setIsEducator, 
    calculateChapterTime,calclulateCourseDuration,calculateNumberOfLectures, enrolledCourses, fetchUserEnrolledCourses
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};