import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/store';

const Animations = () => {

  const animationsArray = useStore((s) => s.animationsArray);
	const selectAnim = useStore((s) => s.selectAnim);
	const currentModel = useStore((s) => s.activeModel)
  const navigate = useNavigate();

  return (

        <div className='no-scrollbar overflow-y-auto fixed top-[10vh] 
        left-[10vw] h-[85vh] w-[80vw] flex-col justify-center items-center 
        py-6 sm:pr-6 md:pr-4 lg:pr-[5rem] rounded-2xl'>
					{animationsArray?.map((e, i) => {
                        return (
                            <button
                            id='dropdown-item'
								className='mt-1 mb-2 flex h-fit w-full justify-center rounded-lg font-inter text-xl font-light text-zinc-200 hover:text-zinc-400'
								onClick={() => {
                                    selectAnim(e);
                                    navigate(`/3d/sandbox/${currentModel}/${e}`);
								}}
								key={i}>
								{e}
							</button>
						);
					})}
          </div>
          
  )
}

export default Animations