import { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);
  if (!course) {
    return <div>No course data available.</div>;
  }
  const fallbackImage = assets.course_1_thumbnail; // Use a valid fallback image from assets
  return (
      <Link to={'/course/' + course._id} onClick={() => scrollTo(0,0,)} className='border
       border-gray-500 pb-6 overflow-hidden rounded-lg' >
      <img
         className='cursor-pointer w-full' src={course.courseThumbnail || fallbackImage}
         alt={course.courseTitle}
         onError={(e) => {e.target.src = '/path/to/fallback-image.jpg';  }}/>
      <div className='p-3 text-left'>
        <h3 className='cursor-pointer text-base font-semibold' >{course.courseTitle}</h3>
        <p className='cursor-pointer text-gray-500' >Great Stack</p> {/* Handle missing educator */}
        <div className='flex items-center space-x-2'>
          <p className='cursor-pointer' > {calculateRating(course)} </p>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <img key={i} src={ i< Math.floor(calculateRating(course)) ? assets.star : assets.star_blank  }
               alt='star' className='cursor-pointer w-3.5 h-3.5' />
            ))}
          </div>
          <p className='text-gray-600'> {course.courseRatings.length} </p>
        </div>
        <p className='text-base font-semibold text-gray-800'>
          {currency} {(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
        </p>
      </div>
      </Link>
    
  );
};

export default CourseCard;