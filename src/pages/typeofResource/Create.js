import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { APIURL } from "../../config"

function Create(props) {
  let history = useHistory();
  const location = useLocation();
  const [name, setName] = useState('');
  const [attributes, setAttributes] = useState([]);
  
  const plusAddribute = (e) => {
    if (e.code === 'Enter') {
      console.log(e.target.value)
      e.target.blur();
    }
  }
  const checkExist = (e) => {
    console.log(e.target.value);
    let vm = attributes;
    for (let index = 0; index < vm.length; index++) {
      if (vm[index] === e.target.value) {
        vm.splice(index, 1);
      }
    }
    setAttributes(vm);
  }
  const checkText = (e) => {
    console.log(e.target.value)
    if (e.target.value !== '') {
      let vm = attributes;
      vm.push(e.target.value);
      setAttributes(vm);
      console.log(attributes);
    }
  }
  const createNewType = () => {
    const data = {
      name: name,
      attributes: attributes
    };
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post(APIURL + `typeofResource`, data)
      .then(res => {
        console.log(res);
        console.log(res.data);
        history.push("/typeofResource");
      })
  }
  useEffect(() => {
  }, []);
  return (
    <div>
      {
        location.pathname === '/typeofResource/Create' ?
          <form>
            <div className="shadow overflow-hidden sm:rounded-md my-10">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="calendar-name" className="block text-sm font-medium text-gray-700">typeOfResource Name</label>
                    <input type="text" onChange={(e) => { setName(e.target.value) }} name="calendar-name" id="first-name" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <div className="col-span-6 sm:col-span-3"></div>
                </div>
              </div>
              <div className="px-4 py-5 bg-white sm:p-6">
                <label htmlFor="calendar-name" className="block text-sm font-medium text-gray-700">Attributes</label>
                <div className="flex flex-wrap">
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <input type="text" name="calendar-name" onKeyPress={(e) => { plusAddribute(e) }} onFocus={checkExist} onBlur={checkText} autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 mx-1 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mr-10">
                <button type="button" onClick={createNewType} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save
                </button>
              </div>
            </div>
          </form>
          : null
      }
    </div>

  );
}

export default Create;