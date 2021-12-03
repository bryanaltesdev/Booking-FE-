import React, { useState, useEffect } from 'react';
import Datepicker from '../../partials/actions/Datepicker';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { APIURL } from "../../config"
import TimePicker from 'react-time-picker';

function Create(props) {
  let history = useHistory();
  const location = useLocation();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState('20:00');
  const [startTime, setStartTime] = useState('10:00');
  const [minimum, setMinimum] = useState('');
  const [maximum, setMaximum] = useState('');
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [available, setAvailable] = useState(false);
  const createNewCalendar = () => {
    console.log(name, available, startDate, startTime, endTime, endDate, minimum, maximum, monday, tuesday, wednesday, thursday, friday, saturday, sunday);
    const data = {
      name: name,
      available: available,
      startDate: startDate.toString().slice(4, 15),
      endDate: endDate.toString().slice(4, 15),
      startTime: startTime,
      endTime: endTime,
      minimum: minimum,
      maximum: maximum,
      days: [monday , tuesday , wednesday , thursday, friday , saturday, sunday]
    };
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post(APIURL+`resourceCalendar`,  data)
      .then(res => {
        console.log(res);
        console.log(res.data);
        history.push("/resourceCalendar");
      })
  }
  useEffect(() => {
    document.getElementsByClassName('react-time-picker__wrapper')[0].style.border = 'aliceblue'
    document.getElementsByClassName('react-time-picker__wrapper')[1].style.border = 'aliceblue'
  }, []);
  return (
    <div>
      {
        location.pathname === '/resourceCalendar/Create' ?
          <form>
            <div className="shadow overflow-hidden sm:rounded-md my-10">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="calendar-name" className="block text-sm font-medium text-gray-700">Calendar Name</label>
                    <input type="text" onChange={(e) => { setName(e.target.value) }} name="calendar-name" id="first-name" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <div className="flex items-start mt-8 ml-20">
                      <div className="flex items-center h-5">
                        <input id="available" name="candidates" onChange={(e) => { setAvailable(e.target.checked) }} type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm mx-2">
                        <label htmlFor="Tuesday" className="font-medium text-gray-700">Available</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">Start date</label>
                    <Datepicker setDate={setStartDate} />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">End date</label>
                    <Datepicker setDate={setEndDate} />
                  </div>
                  <div className="col-span-2"></div>
                  <div className="col-span-6 sm:col-span-2 lg:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">start time</label>
                    <TimePicker
                      className="form-input pl-9 text-gray-500 hover:text-gray-600 font-medium focus:border-gray-300 w-60"
                      onChange={setStartTime}
                      value={startTime}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2 lg:col-span-2">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">end time</label>
                    <TimePicker
                      className="form-input pl-9 text-gray-500 hover:text-gray-600 font-medium focus:border-gray-300 w-60"
                      onChange={setEndTime}
                      value={endTime}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-1 lg:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">minimum duration</label>
                    <input type="text" name="postal-code" id="postal-code" onChange={(e) => { setMinimum(e.target.value) }} autoComplete="postal-code" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <div className="col-span-6 sm:col-span-1 lg:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">maximum duration</label>
                    <input type="text" name="postal-code" id="postal-code" onChange={(e) => { setMaximum(e.target.value) }} autoComplete="postal-code" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <fieldset className=" sm:col-span-6 lg:col-span-6">
                    <legend className="text-base font-medium text-gray-900">Week</legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-around">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="Monday" name="comments" onChange={(e) => { setMonday(e.target.checked) }} type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm mx-2">
                            <label htmlFor="Monday" className="font-medium text-gray-700">Monday</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="Tuesday" name="candidates" onChange={(e) => { setTuesday(e.target.checked) }} type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
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
                <button type="button" onClick={createNewCalendar} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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