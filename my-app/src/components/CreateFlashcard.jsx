import React from 'react';
import styles from '../styles/createFlashcard.module.css'
import Navbar from '../pages/Navbar';

function CreateFlashcard() {
    return (
        
        <div >
            {/* top logo */}

            <div className='  '>
                <div className=" bg-gray mx-5 my-3 ">
                    <div className="flex items-center ">
                        <div className="bg-red-600 h-9.5 text-white font-bold text-2xl pt-0.5 px-1 rounded-sm ">
                            AI
                        </div>
                        <div className="text-gray-800 font-semibold text-2xl ">
                            maBetter
                        </div>
                    </div>
                </div>
                <hr className="w-full border-t border-gray-400 shadow-2xl" />
            </div>

            <div className={styles.back}  >
  
            {/* title */}
              
                <div>
                    <div className={styles.flash} >
                        Create Flashcard
                    </div>
                </div>

            {/* navbar */}

            <div>
                <Navbar/>
            </div>

            </div>

        </div>




    );
}

export default CreateFlashcard;
