import React from 'react'
import './home.css';
import { useState } from 'react';

const Form = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e?.target?.name]: e?.target?.value,
      [e?.target?.email]: e?.target?.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editClick) {
      const tempTableData = tableData;
      Object.assign(tempTableData[editIndex], inputs);
      setTableData([...tempTableData]);
      setEditClick(false);
      setInputs({
        name: "",
        email: "",
      });
    } else {
      setTableData([...tableData, inputs]);
      setInputs({
        name: "",
        email: "",
      });
    }
  };
  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    setTableData(filterData);
  };
  const handleEdit = (index) => {
    const tempData = tableData[index];
    setInputs({ name: tempData.name, email: tempData.email });
    setEditClick(true);
    setEditIndex(index);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <h1 className='text-center'> CRUD App </h1>

          <div className="col-lg-3 col-md-6 mt-3 p-4" style={{ borderRadius: "6px", backgroundColor: "white" }}>
            <form onSubmit={handleSubmit} required>
              <div className="mb-3">
                <input name="name" value={inputs.name} onChange={handleChange}
                  className="form-control p-3" placeholder="Enter Name" required />
              </div>
              <div className="mb-3">
                <input name="email" value={inputs.email} onChange={handleChange}
                  className="form-control p-3" placeholder="Email" required />
              </div>
              <div>
                <button type='submit' className="btn mt-1 ms-5 p-1 fs-5 bg-primary"
                  style={{ color: "white", width: "70%" }}>
                  {editClick ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>

          <div className="row d-flex justify-content-center">
            <div className='col-lg-8 col-md-6'>
              <table className=' text-center mt-4' style={{ width: "100%" }}>
                <thead>
                  <tr className='p-2'>
                    <th> Name </th>
                    <th> Email </th>
                    <th> Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, i) => (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        <button onClick={() => handleEdit(i)} className='btn bg-primary me-2'> Edit </button>
                        <button className='btn bg-danger' onClick={() => handleDelete(i)}> Delete </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Form;
