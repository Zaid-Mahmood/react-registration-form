import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import "../Styles/RegistrationForm.css"
import * as yup from 'yup'

function RegistrationForm() {

  const [isUpdate, setisUpdate] = useState(false);

  const [listData, setListData] = useState([]);


  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    textarea: "",
    courses: "",
    nationality: ""
  }
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Please Enter first name"),
    lastName: yup.string().required("Please Enter last name"),
    email: yup.string().required("Please Enter your email").email("Please enter valid Email"),
    phoneNumber: yup.string().required("Please Enter your Phone Number").matches(/^[0-9]{10}$/, 'Phone number is not valid'),
    gender: yup.string().required("Please select the gender"),
    textarea: yup.string().required("Please enter the description"),
    courses: yup.string().required("Please pick one option from dropdown"),
    nationality: yup.string().required("Please pick any option from the nationality")
  })

  const handleSubmit = (values, { resetForm }) => {

    // resetForm and setValues is a formik built-in function

    if (isUpdate) {

      setisUpdate(false);

      const isEmail = values.email

      let findingEmailIndex = listData.findIndex(x => x.email === isEmail)
      const updatedItems = [...listData]; // Create a copy of the array
      updatedItems[findingEmailIndex] = values; // Replace the object with the new item
      // Step 3: Update the state with the modified array
      setListData(updatedItems);
    }
    else {
      setListData([...listData, values])
    }

    resetForm();

  }


  const handleDelete = (index) => {
    let deleteRow = [...listData]
    deleteRow.splice(index, 1)
    setListData(deleteRow)
  }

  return (
    <div className='container border rounded-1 w-100'>
      <h1>Registration Form </h1>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
        {({ setValues }) => (
          <Form>
            <div className='row'>
              <div className='col-md-6'>
                <div className="text-start mb-3">
                  <label for="exampleFormControlInput1" className="form-label">First Name</label>
                  <Field type="text" className="form-control" placeholder = "e.g firstName" name="firstName" id="exampleFormControlInput1" />
                </div>

                <p className='text-danger'>
                  <ErrorMessage name="firstName" />
                </p>
              </div>

              <div className='col-md-6'>
                <div className="text-start mb-3">
                  <label for="exampleFormControlInput1" className="form-label">Last Name</label>
                  <Field type="text" className="form-control" name="lastName" placeholder = "e.g Last Name" id="exampleFormControlInput1" />
                </div>
                <p className='text-danger'>
                  <ErrorMessage name="lastName" />
                </p>
              </div>


              <div className='col-md-6'>
                <div className="text-start mb-3">
                  <label for="exampleFormControlInput1" className="form-label">Email Address</label>
                  <Field type="email" className="form-control" placeholder = "e.g abc@gmail.com" name="email" id="exampleFormControlInput1" />
                </div>
                <p className='text-danger'>
                  <ErrorMessage name="email" />
                </p>
              </div>

              <div className='col-md-6'>
                <div className="text-start mb-3">
                  <label for="exampleFormControlInput1" className="form-label">Phone Number</label>
                  <Field type="number" className="form-control" name="phoneNumber" placeholder = "03001234567" id="exampleFormControlInput1" />
                </div>
                <p className='text-danger'>
                  <ErrorMessage name="phoneNumber" />
                </p>
              </div>

              <div className='col-md-6'>
                <div className="input-group mb-3">
                  <label className="text-start input-group-text" for="inputGroupSelect02">Courses</label>
                  <Field component="select" name="courses" className="form-select" id="inputGroupSelect02">
                    <option value="">Select</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="Bootstrap">Bootstrap</option>
                    <option value="Javascript">Javascript</option>
                  </Field>
                </div>
                <p className='text-danger'>
                  <ErrorMessage name="courses" />
                </p>
              </div>

              <div className='col-md-6'>
                <div className="input-group mb-3">
                  <label className="text-start input-group-text" for="inputGroupSelect02">Nationality</label>
                  <Field component="select" name="nationality" className="form-select" id="inputGroupSelect02">
                    <option value="">Select</option>
                    <option value="Pakistani">Pakistani</option>
                    <option value="Indian">Indian</option>
                    <option value="Canadian">Canadian</option>
                    <option value="American">American</option>
                  </Field>
                </div>
                <p className='text-danger'>
                  <ErrorMessage name="nationality" />
                </p>
              </div>

              <div className='col-md-6'>
                <label className='float-start'>Gender</label>
                <br />
                <div className="form-check float-start ps-0">
                  <Field className="form-check-Field" type="radio" name="gender" value="male" id="flexRadioDefault1" />
                  <label className="form-check-label" for="flexRadioDefault1">
                    Male
                  </label>
                  &nbsp;
                  <Field className="form-check-Field" type="radio" name="gender" value="female" id="flexRadioDefault2" />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Female
                  </label>
                </div>
                <p className='float-start pt-4 text-danger'>
                  <ErrorMessage name="gender" />
                </p>
              </div>


              <div className='col-md-6'>
                <div className="text-start mb-3">
                  <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                  <Field as="textarea" className="form-control" name="textarea" id="exampleFormControlTextarea1" rows="3" />
                </div>
                <p className='text-danger'>
                  <ErrorMessage name="textarea" />
                </p>
              </div>
            </div>

            {isUpdate === false ?
              <button className='btn btn-primary'>Submit</button>
              :
              <button className='btn btn-success'>Update</button>
            }

            {/* Table */}
            <div className='table-responsive'>
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Email</th>
                    <th scope="col" className='w-100'>Phone No</th>
                    <th scope="col">Courses</th>
                    <th scope="col">Nationality</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Description</th>
                    <th scope="col" colSpan={2} >Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listData.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.firstName}</td>
                      <td>{data.lastName}</td>
                      <td>{data.email}</td>
                      <td>{data.phoneNumber}</td>
                      <td>{data.courses}</td>
                      <td>{data.nationality}</td>
                      <td>{data.gender}</td>
                      <td>{data.textarea}</td>
                      <td><button type="button" className='btn btn-secondary' onClick={() => { setValues(data); setisUpdate(true) }}>Update</button></td>
                      <td><button type="button" className='btn btn-danger' onClick={() => handleDelete(index)} >Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RegistrationForm
