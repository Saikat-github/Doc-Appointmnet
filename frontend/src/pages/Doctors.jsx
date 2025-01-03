import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [selectedSpecialist, setSelectedSpecialist] = useState(speciality || '');
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();



  useEffect(() => {
    setFilterDoc(selectedSpecialist ? doctors.filter((d) => d.speciality === selectedSpecialist) : doctors);
  }, [selectedSpecialist, doctors]);



  const handleSpecialistClick = (spec) => {
    const newSpecialist = selectedSpecialist === spec ? '' : spec;
    setSelectedSpecialist(newSpecialist);
    navigate(`/doctors/${newSpecialist || ''}`);
  };



  const specialists = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ];


  

  return (
    <div className='mb-20 mt-6'>
      <p className='text-center font-semibold text-lg'>Browse through the doctors specialist</p>
      <div className='flex mt-2 gap-6 flex-col sm:flex-row'>
        <div className='text-sm mt-6 flex flex-row sm:flex-col gap-3 flex-wrap '>
          {specialists.map((spec) => (
            <p
              key={spec}
              className={`px-4 py-1 border-2 rounded hover:bg-blue-100 cursor-pointer ${selectedSpecialist === spec && "bg-blue-100"}`}
              onClick={() => handleSpecialistClick(spec)}
            >
              {spec}
            </p>
          ))}
        </div>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {filterDoc.map((doctor) => (
            <div
              key={doctor._id}
              onClick={() => navigate(`/appointments/${doctor._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            >
              <img className='bg-blue-50' src={doctor.image} alt={doctor.name} />
              <div className='p-4'>
                {
                  doctor.available
                  ?
                  <div className='flex items-center gap-2 text-sm text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                  <p>Available</p>
                </div>
                : 
                <div className='flex items-center gap-2 text-sm text-red-500'>
                  <p className='w-2 h-2 bg-red-500 rounded-full'></p>
                  <p>Not Available</p>
                </div>
                }
                <p className='text-gray-900 text-lg font-medium'>{doctor.name}</p>
                <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
