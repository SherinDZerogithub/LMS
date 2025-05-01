import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/student/Loading';


const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { currency } = useContext(AppContext);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  // Execute the function whenever the component gets loaded
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
   <div className='space-y-5' >
   <div className='flex flex-wrap gap-5'> {/* Changed to flex and added gap for spacing */}
        <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
          <img src={assets.patients_icon} alt="patients-icon" />
          <div>
            <p className='text-2xl font-medium text-gray-600'>{dashboardData.enrolledStudentsData.length}</p>
            <p className='text-base text-gray-500'>Total Enrollments</p>
          </div>
        </div>
        <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
          <img src={assets.appointments_icon} alt="patients-icon" />
          <div>
            <p className='text-2xl font-medium text-gray-600'>{dashboardData.totalCourses}</p>
            <p className='text-base text-gray-500'>Total Courses</p>
          </div>
        </div>
        <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
          <img src={assets.earning_icon} alt="earning-icon" />
          <div>
            <p className='text-2xl font-medium text-gray-600'>{currency} {dashboardData.totalEarnings}</p>
            <p className='text-base text-gray-500'>Total Earnings</p>
          </div>
        </div>
      </div>
     <div>
     <h2 className='pb-4 text-lg font-medium' >Latest Enrollments </h2>
     <div className=' flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border-gray-400 '>
     <table className='table-fixed md:table-auto w-full overflow-hidden'>
  <thead className='text-gray-900 border-b border-gray-400 text-sm text-center'>
    <tr>
      <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#          </th>
      <th className='px-4 py-3 font-semibold'>Student Name</th>
      <th className='px-4 py-3 font-semibold'>Course Title</th>
    </tr>
  </thead>
  <tbody className='text-sm text-gray-500'>
    {dashboardData.enrolledStudentsData.map((item, index) => (
      <tr key={index} className='border-b border-gray-400'>
        <td className='px-4 py-3 text-center hidden sm:table-cell'>{index + 1}</td>
        <td className='px-4 py-3'>
          <div className='flex items-center space-x-3'> {/* Use a div with flex for alignment */}
            <img
              src={item.student.imageUrl}
              alt="profile"
              className='w-9 h-9 rounded-full'
            />
            <span className='truncate'>{item.student.name}</span>
          </div>
        </td>
        <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
      </tr>
    ))}
  </tbody>
</table>

     </div>
     </div>
   </div>
    </div>
  ) : <Loading />;
};

export default Dashboard;