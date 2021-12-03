import React, { useState, useEffect } from 'react';
import Datepicker from '../../partials/actions/Datepicker';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { APIURL } from "../../config"
import TimePicker from 'react-time-picker';

function Create(props) {
  let history = useHistory();
  const location = useLocation();
  const [note, setNote] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [resource, setResource] = useState(null);
  const [resourceArray, setResourceArray] = useState([]);
  const createNewReservation = () => {
    console.log(startTime.slice(0, 2), endTime)
    let t1= parseInt(startTime.slice(0, 2))*3600+ parseInt(startTime.slice(3, 5))*60;
    let t2= parseInt(endTime.slice(0, 2))*3600+ parseInt(endTime.slice(3, 5))*60;
    console.log(t1, t2)
    const data = {
      note: note,
      startDate: startDate.getTime()/1000 + t1,
      endDate: endDate.getTime()/1000 + t2,
      resource: resource
    };
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post(APIURL+`Reservation`, data)
      .then(res => {
        console.log(res.data);
        history.push("/Reservation");
      })
  }
  const addremoveResource = (e) => {
    console.log(e.target.id, e.target.checked);
    if (e.target.checked) {
      for (let index = 0; index < resourceArray.length; index++) {
        if (resourceArray[index].id === e.target.id) {
          console.log(resourceArray[index])
          setResource(resourceArray[index]);
        }
      }
    }
    else {
      setResource(null);
    }
  }
  useEffect(() => {
    document.getElementsByClassName('react-time-picker__wrapper')[0].style.border = 'aliceblue';
    document.getElementsByClassName('react-time-picker__wrapper')[1].style.border = 'aliceblue';
    axios.get(APIURL+`resource`)
      .then(res => {
        console.log(res.data)
        setResourceArray(res.data);
      })
  }, []);
  return (
    <div>
      {
        location.pathname === '/Reservation/Create' ?
          <form>
            <div className="shadow overflow-hidden sm:rounded-md my-10">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="calendar-name" className="block text-sm font-medium text-gray-700">Note</label>
                    <input type="text" onChange={(e) => { setNote(e.target.value) }} name="calendar-name" id="first-name" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-3">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">Start date</label>
                    <Datepicker setDate={setStartDate} />
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">End date</label>
                    <Datepicker setDate={setEndDate} />
                  </div>
                  <div className="col-span-6 sm:col-span-2 lg:col-span-3">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">start time</label>
                    <TimePicker
                      className="form-input pl-9 text-gray-500 hover:text-gray-600 font-medium focus:border-gray-300 w-60"
                      onChange={setStartTime}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2 lg:col-span-3">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">end time</label>
                    <TimePicker
                      className="form-input pl-9 text-gray-500 hover:text-gray-600 font-medium focus:border-gray-300 w-60"
                      onChange={setEndTime}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="calendar-name" className="block text-sm font-medium text-gray-700">Resource</label>
                    <div className="flex justify-around mt-4">
                        {
                          resourceArray.map((resource, index) =>
                            <div className="flex items-start" key={index}>
                              <div className="flex items-center h-5">
                                <input id={resource.id} name="comments" onChange={addremoveResource} type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                              </div>
                              <div className="ml-3 text-sm mx-2">
                                <label htmlFor="Monday" className="font-medium text-gray-700">{resource.name}</label>
                              </div>
                            </div>
                          )
                        }
                      </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-15">
                <button type="button" onClick={createNewReservation} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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