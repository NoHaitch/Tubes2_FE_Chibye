import React from 'react';
import Modal from 'react-modal';
import FotBar from '../Images/Fotbar.jpg'

const ProfileModal = ({ isOpen, closeModal }) => {
  const dataProfil = [{
    fullName: "Raden Francisco Tianto B",
    shortName: "Ciko",
    nim:"13522091",
    github:"https://github.com/NoHaitch"
  },{
    fullName: "Suthasoma M. Munthe",
    shortName: "Sutha",
    nim:"13522098",
    github:"github.com/sotul04"
  },{
    fullName: "Ignatius J. Hezkiel Chan",
    shortName: "Kiel",
    nim:"13522029",
    github:"https://github.com/chankiel"
  }]
  const compData = dataProfil.map(item=>{
    return(
      <div className='border-2 border-black text-center w-1/3 h-32 rounded-xl py-2' style={{backgroundColor:"#A3D8FF"}}>
        <h1 className='font-bold'>{item.fullName}</h1>
        <h2>{item.shortName}</h2>
        <h3>{item.nim}</h3>
        <a href={item.github} className='font-semibold hover:text-white'>Github</a>
      </div>
    )
  })
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Profiles"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
    >
      <div className="bg-white rounded-lg p-8 max-w-4xl w-3/4">
        <h2 className="text-2xl font-bold mb-4 text-center">Profiles</h2>
        <img src={FotBar} alt='FotBar'/>
        <ul className="mt-5 text-lg flex flex-row items-center gap-5">
          {compData}
        </ul>
        <div className='text-center'>
          <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md" onClick={closeModal}>Close</button>
          </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;

