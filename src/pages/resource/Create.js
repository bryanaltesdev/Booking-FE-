import React, { useState, useEffect } from 'react';
// import Datepicker from '../../partials/actions/Datepicker';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { APIURL } from "../../config"
import TimePicker from 'react-time-picker';

function Create(props) {
  let history = useHistory();
  const location = useLocation();
  const [name, setName] = useState('');
  const [attribute, setAttr] = useState({});
  const [calendars, setCalendars] = useState([]);
  const [places, setPlaces] = useState({});
  const [availablecalendars, setAcalendars] = useState([]);
  const [availableplaces, setAplaces] = useState([]);
  const createNewResource = () => {
    const data = {
      name: name,
      calendars: calendars,
      place: places,
      attributes: attribute
    };
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post(APIURL+`resource`, data)
      .then(res => {
        console.log(res);
        console.log(res.data);
        history.push("/resource");
      })
  }
  const addRemoveCalendar = (data) => {
    console.log(data.id, data.checked);
    if (data.checked) {
      for (let index = 0; index < availablecalendars.length; index++) {
        if (availablecalendars[index].id === data.id) {
          let vm = [...calendars, availablecalendars[index]];
          console.log(vm)
          setCalendars(vm);
        }
      }
    }
    else {
      for (let index = 0; index < calendars.length; index++) {
        if (calendars[index].id === data.id) {
          let vm = calendars;
          vm.splice(index, 1);
          console.log(vm)
          setCalendars(vm);
        }
      }
    }
  }
  const addRemovePlace = (data) => {
    console.log(data.id, data.checked);
    if (data.checked === true) {
      for (let index = 0; index < availableplaces.length; index++) {
        if (availableplaces[index].id === data.id) {
          let vm = availableplaces[index];
          console.log(vm)
          setPlaces(vm);
        }
      }
    }
    else if(data.checked === false){
      for (let index = 0; index < places.length; index++) {
        if (places[index].id === data.id) {
          setPlaces({});
        }
      }
    }
  }
  const keyPress = (e) => {
    if (e.code === 'Enter') {
      console.log(e.target.value)
      e.target.blur();
    }
  }
  const keyBlur = (e) => {
    if (e.target.value !== '') {
      console.log(e.target.value)
      let vm = attribute;
      vm[e.target.value] = "";
      setAttr(vm);
      console.log(attribute);
    }
  }
  const keyFocus = (e) => {
    if (e.target.value !== '') {
      console.log(e.target.value)
      let vm = attribute;
      delete vm[e.target.value];
      setAttr(vm);
      console.log(attribute);
    }
  }
  const changeValue = (e) => {
      console.log(e.target.previousSibling.value)
      let key = e.target.previousSibling.value;
      let value = e.target.value;
      let vm = attribute;
      vm[key] = value;
      setAttr(vm);
      console.log(attribute);
  }
  useEffect(() => {
    axios.get(APIURL + `resourceCalendar`)
      .then(res => {
        console.log(res.data);
        setAcalendars(res.data);
      })
    axios.get(APIURL + `Place`)
    .then(res => {
      console.log(res.data);
      setAplaces(res.data);
    })
  }, []);
  return (
    <div>
      {
        location.pathname === '/resource/Create' ?
          <form>
            <div className="shadow overflow-hidden sm:rounded-md my-10">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-4 sm:col-span-2">
                    <label htmlFor="calendar-name" className="block text-sm font-medium text-gray-700">Resource Name</label>
                    <input type="text" onChange={(e) => { setName(e.target.value) }} name="calendar-name" id="first-name" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <div className="col-span-6 sm:col-span-3"></div>
                  <fieldset className=" sm:col-span-6 lg:col-span-6">
                    <legend className="text-base font-medium text-gray-900">Calendars</legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-around">
                        {
                          availablecalendars.map((calendar, index) =>
                            <div className="flex items-start" key={index}>
                              <div className="flex items-center h-5">
                                <input id={calendar.id} name="comments" onChange={(e) => { addRemoveCalendar(e.target) }} type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                              </div>
                              <div className="ml-3 text-sm mx-2">
                                <label htmlFor="Monday" className="font-medium text-gray-700">{calendar.name}</label>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className=" sm:col-span-6 lg:col-span-6">
                    <legend className="text-base font-medium text-gray-900">Places</legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-around">
                        {
                          availableplaces.map((place, index) =>
                            <div className="flex items-start" key={index}>
                              <div className="flex items-center h-5">
                                <input id={place.id} name="comments" onChange={(e) => { addRemovePlace(e.target) }} type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                              </div>
                              <div className="ml-3 text-sm mx-2">
                                <label htmlFor="Monday" className="font-medium text-gray-700">{place.name}</label>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className=" sm:col-span-6 lg:col-span-6">
                    <legend className="text-base font-medium text-gray-900">Attributes</legend>
                    <div className="mt-4 flex flex-wrap">
                      <div className="flex">
                        <input type="text" name="key-1" onKeyPress={keyPress} onFocus={keyFocus} onBlur={keyBlur} placeholder="key" autoComplete="given-name" className="mt-1 mr-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        <input type="text" name="value-1" onChange={changeValue} placeholder="value" autoComplete="given-name" className="mt-1 mr-5 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                      <div className="flex">
                        <input type="text" name="key-1" onKeyPress={keyPress} onFocus={keyFocus} onBlur={keyBlur} placeholder="key" autoComplete="given-name" className="mt-1 mr-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        <input type="text" name="value-1" onChange={changeValue} placeholder="value" autoComplete="given-name" className="mt-1 mr-5 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                      <div className="flex">
                        <input type="text" name="key-1" onKeyPress={keyPress} onFocus={keyFocus} onBlur={keyBlur} placeholder="key" autoComplete="given-name" className="mt-1 mr-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        <input type="text" name="value-1" onChange={changeValue} placeholder="value" autoComplete="given-name" className="mt-1 mr-5 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                      <div className="flex">
                        <input type="text" name="key-1" onKeyPress={keyPress} onFocus={keyFocus} onBlur={keyBlur} placeholder="key" autoComplete="given-name" className="mt-1 mr-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        <input type="text" name="value-1" onChange={changeValue} placeholder="value" autoComplete="given-name" className="mt-1 mr-5 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                      <div className="flex">
                        <input type="text" name="key-1" onKeyPress={keyPress} onFocus={keyFocus} onBlur={keyBlur} placeholder="key" autoComplete="given-name" className="mt-1 mr-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        <input type="text" name="value-1" onChange={changeValue} placeholder="value" autoComplete="given-name" className="mt-1 mr-5 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                      <div className="flex">
                        <input type="text" name="key-1" onKeyPress={keyPress} onFocus={keyFocus} onBlur={keyBlur} placeholder="key" autoComplete="given-name" className="mt-1 mr-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        <input type="text" name="value-1" onChange={changeValue} placeholder="value" autoComplete="given-name" className="mt-1 mr-5 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                      <div className="flex">
                        <input type="text" name="key-1" onKeyPress={keyPress} onFocus={keyFocus} onBlur={keyBlur} placeholder="key" autoComplete="given-name" className="mt-1 mr-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        <input type="text" name="value-1" onChange={changeValue} placeholder="value" autoComplete="given-name" className="mt-1 mr-5 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                      <div className="flex">
                        <input type="text" name="key-1" onKeyPress={keyPress} onFocus={keyFocus} onBlur={keyBlur} placeholder="key" autoComplete="given-name" className="mt-1 mr-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        <input type="text" name="value-1" onChange={changeValue} placeholder="value" autoComplete="given-name" className="mt-1 mr-5 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                      <div className="flex">
                        <input type="text" name="key-1" onKeyPress={keyPress} onFocus={keyFocus} onBlur={keyBlur} placeholder="key" autoComplete="given-name" className="mt-1 mr-1 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        <input type="text" name="value-1" onChange={changeValue} placeholder="value" autoComplete="given-name" className="mt-1 mr-5 focus:ring-indigo-500 focus:border-indigo-500 block w-40 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="button" onClick={createNewResource} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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