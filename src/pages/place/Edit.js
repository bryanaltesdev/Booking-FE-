import React, { useState, useRef, useEffect } from 'react';
import Datepicker from '../../partials/actions/Datepicker';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { APIURL} from "../../config"
import TimePicker from 'react-time-picker';

function Edit(props) {
  console.log(props);
  let history = useHistory();
  const mondayRef = useRef(null);
  const location = useLocation();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [minimum, setMinimum] = useState('');
  const [maximum, setMaximum] = useState('');
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const editCalendar = () => {
    const data = {
      name: name,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      minimum: minimum,
      maximum: maximum,
      week: [monday && 'Monday', tuesday && 'Tuesday', wednesday && 'Wednesday', thursday && 'Thursday', friday && 'Friday', saturday && 'Saturday', sunday && 'Subday']
    };
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.put(APIURL+`Place/`+props.id, { data })
    .then(res => {
      history.push("/Place");
    })
  }
  const deleteCalendar = () => {
    axios.delete(APIURL+`Place/`+props.id)
    .then(res => {
      history.push("/Place");
    })
  }
  useEffect(() => {
    setName(props.data.name);
    setStartDate(props.data.startDate);
    setEndDate(props.data.endDate);
    setStartTime(props.data.startTime);
    setEndTime(props.data.endTime);
    setMinimum(props.data.minimum);
    setMaximum(props.data.maximum);
    setMonday(props.data.week[0]);
    setTuesday(props.data.week[1]);
    setWednesday(props.data.week[2]);
    setThursday(props.data.week[3]);
    setFriday(props.data.week[4]);
    setSaturday(props.data.week[5]);
    setSunday(props.data.week[6]);
    if (props.data.week[0] !== false) {
      document.getElementById('Monday').checked = true;
    }
    if (props.data.week[1] !== false) {
      document.getElementById('Tuesday').checked = true;
    }
    if (props.data.week[2] !== false) {
      document.getElementById('Wednesday').checked = true;
    }
    if (props.data.week[3] !== false) {
      document.getElementById('Thursday').checked = true;
    }
    if (props.data.week[4] !== false) {
      document.getElementById('Friday').checked = true;
    }
    if (props.data.week[5] !== false) {
      document.getElementById('Saturday').checked = true;
    }
    if (props.data.week[6] !== false) {
      document.getElementById('Sunday').checked = true;
    }
    document.getElementsByClassName('react-time-picker__wrapper')[0].style.border = 'aliceblue'
    document.getElementsByClassName('react-time-picker__wrapper')[1].style.border = 'aliceblue'
  }, []);
  return (
    <div>
      {
        location.pathname === '/Place/Edit' ?
          <form>
            <div className="shadow overflow-hidden sm:rounded-md my-10">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="calendar-name" className="block text-sm font-medium text-gray-700">Calendar Name</label>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} name="calendar-name" id="first-name" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <div className="col-span-6 sm:col-span-3"></div>
                  <div className="col-span-2">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">Start date</label>
                    <Datepicker setDate={setStartDate} date={startDate}/>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">End date</label>
                    <Datepicker setDate={setEndDate} date={endDate}/>
                  </div>
                  <div className="col-span-2"></div>
                  <div className="col-span-6 sm:col-span-2 lg:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">start time</label>
                    <TimePicker
                      className="form-input pl-9 text-gray-500 hover:text-gray-600 font-medium focus:border-gray-300 w-60"
                      onChange={setStartTime}
                      value={startTime}
                    />
                    {/* <input type="text" name="city" value={startTime} id="city" onChange={(e) => { setStartTime(e.target.value) }} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" /> */}
                  </div>

                  <div className="col-span-6 sm:col-span-2 lg:col-span-2">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">end time</label>
                    <TimePicker
                      className="form-input pl-9 text-gray-500 hover:text-gray-600 font-medium focus:border-gray-300 w-60"
                      onChange={setEndTime}
                      value={endTime}
                    />
                    {/* <input type="text" name="state" value={endTime} id="state" onChange={(e) => { setEndTime(e.target.value) }} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" /> */}
                  </div>

                  <div className="col-span-6 sm:col-span-1 lg:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">minimum duration</label>
                    <input type="text" name="postal-code" value={minimum} id="postal-code" onChange={(e) => { setMinimum(e.target.value) }} autoComplete="postal-code" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <div className="col-span-6 sm:col-span-1 lg:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">maximum duration</label>
                    <input type="text" name="postal-code" value={maximum} id="postal-code" onChange={(e) => { setMaximum(e.target.value) }} autoComplete="postal-code" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <fieldset className=" sm:col-span-6 lg:col-span-6">
                    <legend className="text-base font-medium text-gray-900">Week</legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-around">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="Monday" ref={mondayRef} name="comments" onChange={(e) => { setMonday(e.target.checked) }} type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm mx-2">
                            <label htmlFor="Monday" className="font-medium text-gray-700">Monday</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="Tuesday" name="candidates" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm mx-2">
                            <label htmlFor="Tuesday" className="font-medium text-gray-700">Tuesday</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="Wednesday" name="offers" type="checkbox" onChange={(e) => { setWednesday(e.target.checked) }} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm mx-2">
                            <label htmlFor="Wednesday" className="font-medium text-gray-700">Wednesday</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="Thursday" name="offers" type="checkbox" onChange={(e) => { setThursday(e.target.checked) }} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm mx-2">
                            <label htmlFor="Thursday" className="font-medium text-gray-700">Thursday</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="Friday" name="offers" type="checkbox" onChange={(e) => { setFriday(e.target.checked) }} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm mx-2">
                            <label htmlFor="Friday" className="font-medium text-gray-700">Friday</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="Saturday" name="offers" type="checkbox" onChange={(e) => { setSaturday(e.target.checked) }} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm mx-2">
                            <label htmlFor="Saturday" className="font-medium text-gray-700">Saturday</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="Sunday" name="offers" type="checkbox" onChange={(e) => { setSunday(e.target.checked) }} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm mx-2">
                            <label htmlFor="Sunday" className="font-medium text-gray-700">Sunday</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="button" onClick={editCalendar} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-1">
                  Save
                </button>
                <button type="button" onClick={deleteCalendar} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                  Delete
                </button>
              </div>
            </div>
          </form>
          : null
      }
    </div>

  );
}

export default Edit;