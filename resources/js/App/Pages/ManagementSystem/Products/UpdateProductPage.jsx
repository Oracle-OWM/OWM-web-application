import React, {useContext, useEffect} from 'react'
import { withRouter } from 'react-router-dom';
import { GeneralContext } from '../../../Context/GeneralContext';

import { ProductContext } from '../../../Context/ProductContext';
import Spinner from '../../../MainComponents/Spinner';



const UpdateProductPage = ({match}) => {
  const { loading, getProductById, updateProduct, message, errors, setInput, inputsState, resetAllInputs, resetAllErrors } = useContext(ProductContext);
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async () => {
    await resetAllInputs();
    await resetAllErrors();
    await getProductById(match.params.id)
    await getContent();
  }, []);

  async function updateHandler(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", inputsState.name);
    formData.append("excerpt", "none");
    formData.append("image", inputsState.image);
    formData.append("_method", 'PUT');
    await updateProduct(match.params.id, formData);
  };

  return (<>
    <section className="w-11/12 mx-auto my-5">
      {loading && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      )}

      {!loading && message === 'This product is not exist' && (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-center font-extrabold text-2xl">{`This product is not exist`}</h1>
        </div>
      )}

      {(!loading && content && inputsState && (<>
        <div className="flex flex-col w-8/12 mx-auto rounded items-center bg-white">
          <h1 className="bg-blue-light p-3 w-9/12 rounded text-white z-10 -mt-5 md:text-2xl text-base">Update Product</h1>
          <form onSubmit={(e)=>updateHandler(e)} className="my-8 space-y-6 w-6/12" encType="multipart/form-data">
            <input type="hidden" name="remember" defaultValue="true" />

            {/* name   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="name" className="capitalize md:text-lg text-xs">
                  Name <span className='text-red-common'>*</span>:
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.name  ? inputsState.name : "" }
                  id={`name`} name="name" type="text" placeholder="Enter The Name"
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.name}</span>)}
              </div>
            </div>

            {/* image   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="image" className="capitalize md:text-lg text-xs">
                  Upload Your Image <span className='text-red-common'>*</span>:
                </label>
                <input id={`image`} onChange={(e)=>setInput(e)}
                  name="image" type="file" placeholder="Upload Image"
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.image}</span>)}
              </div>
            </div>

            {/* Submit   */}
            <div>
              <button type="submit" className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </>))}
    </section>
  </>);
}


export default withRouter(UpdateProductPage);
