import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { APIURL } from "../../config"

function ListCalendar(props) {
  let history = useHistory();
  const location = useLocation();
  const [lists, setLists] = useState([]);
  const [calendars, setCalendars] = useState([]);
  const [resourceCalendar, setResourceCalendar] = useState([]);
  const [place, setPlace] = useState([]);
  const createCalender = (props) => {
    history.push('/resource/Create')
  }
  const calendarEdit = (e, data, id) => {
    e.preventDefault();
    props.setEditId(data, id);
    history.push('/resource/Edit')
  }
  useEffect(() => {
    axios.get(APIURL+`resource`)
      .then(res => {
        console.log(res.data)
        setLists(res.data);
      })
    axios.get(APIURL+`resourceCalendar`)
      .then(res => {
        console.log(res.data)
        setResourceCalendar(res.data);
      })
    axios.get(APIURL+`place`)
      .then(res => {
        console.log(res.data)
        setPlace(res.data);
      })
  }, [props]);
  return (
    <div>
      {
        location.pathname === '/resource' ?
          <div>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white mx-24 my-12" onClick={createCalender}>
              <svg className="w-4 h-4 fill-current opacity-50 flex-shrink-0" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="hidden xs:block ml-2">Add Resource</span>
            </button>
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Calendars
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Attributes
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Place
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Edit
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {
                          lists.map((list, index) => {
                            return (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="">
                                      <div className="text-sm text-gray-500">
                                        {list.name}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {
                                    list.calendars.map((calendar, index) => 
                                      resourceCalendar.map((resource, index) => 
                                        calendar._path.segments[1] == resource.id?
                                        <div>{resource.name}</div>
                                        : null
                                      )
                                    )
                                  }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex">
                                  {
                                    Object.keys(list.attributes).map(function(key, index) {
                                      return (
                                        <div key={index}>
                                            <span>{key}:</span>
                                            <span className="mr-1">{list.attributes[key]}</span>
                                        </div>
                                      )
                                    })
                                  }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                {
                                      place.map((resource, index) => 
                                        list.place._path.segments[1] == resource.id?
                                        <div>{resource.name}</div>
                                        : null
                                      )
                                  }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <a href="#" className="text-indigo-600 hover:text-indigo-900" id={list.id} onClick={(e) => calendarEdit(e, list, list.id)}>Edit</a>
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null
      }

    </div>
  );
}

export default ListCalendar;