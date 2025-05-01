import { useEffect, useState } from "react"
import { dummyStudentEnrolled } from "../../assets/assets"
import { AppContext } from "../../context/AppContext"
import Loading from "../../components/student/Loading";


const StudentEnrolled = () => {

  const [enrolledStudents , setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled)
  }
  useEffect(()=> {
    fetchEnrolledStudents()
  },[] )

  return enrolledStudents ? (
    <div className="min:h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-400">
        <table className="md:table-auto table-fixed w-full overflow-hidden pb-4">
          <thead className="text-gray-900 border-b border-gray-400 text-sm text-center">
            <tr>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell" >#</th>
              <th className="px-4 py-3 font-semibold" >Student Name</th>
              <th className="px-4 py-3 font-semibold" > Course Title </th>
              <th className="px-4 py-3 font-semibold" > Date </th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map((item, index) => (
              <tr key={index} className="border-b border-gray-400">
                <td className='px-4 py-3 text-center hidden sm:table-cell'>{index + 1}</td>
                <td className="px-4 py-3 flex items-center space-x-3 truncate">
                    <img
                      src={item.student.imageUrl}
                      alt="Course Image"
                      className="w-16 h-10 object-cover rounded-md"
                    />
                    <span className="truncate">{item.student.name}</span> {/* Removed hidden md:block */}
                  </td>
                  <td className="px-4 py-3 truncate"> {item.courseTitle} </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {new Date(item.purchaseDate).toLocaleDateString()}
                  </td>
              </tr>
            ) )

            }
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading/>
}

export default StudentEnrolled