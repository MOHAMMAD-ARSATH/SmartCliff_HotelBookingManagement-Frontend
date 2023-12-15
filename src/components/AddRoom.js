import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, Select } from "antd";
import Swal from "sweetalert2";

import Loader from "./Loader";
import Error1 from "./Error";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 18,
  },
};

const buttonStyle = {
  color: 'white',
  backgroundColor: 'black',
  borderColor: 'white',
  padding: "5px 25px",
  height: '35px',
  fontSize: '16px',
  float: 'right',

};

const buttonLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function AddRoom() {
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setError("");
    setLoading(true);
    try {
      const data = (await axios.post("/api/rooms/addroom", values)).data;
      Swal.fire(
        "Congratulations",
        "Your Room Added Successfully",
        "success"
      );
      form.resetFields();
    } catch (error) {
      console.log(error);
      setError(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }

    setLoading(false);
  };

  const validateRoomDescription = (_, value) => {
    if (!value) {
      return Promise.resolve(); // No validation needed for empty values
    }

    if (value.length >= 30) {
      return Promise.resolve();
    }

    return Promise.reject(
      new Error("Room Description must be at least 30 characters")
    );
  };


  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="row">
      {loading ? (
        <Loader />
      ) : error.length > 0 ? (
        <Error1 msg={error} />
      ) : (
        <div className="col-md-12">
          <Form
            {...formItemLayout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            {/* Room Type, Rent per day, and Max Count in a single row */}

            <Form.Item
              name="type"
              label="Room Type"
              rules={[
                {
                  required: true,
                },
              ]}
              style={{ flex: 1, marginRight: "8px" }}
            >
              <Select placeholder="Select a room type" allowClear>
                <Option value="Classic Room">Classic Room</Option>
                <Option value="Deluxe Room">Deluxe Room</Option>
                <Option value="Luxury Room">Luxury Room</Option>
              </Select>
            </Form.Item>
            {/* Room Description */}
            <Form.Item
              name="description"
              label="Room Description"
              rules={[
                {
                  required: true,
                  message: "Room Description is required",
                },
                {
                  validator: validateRoomDescription,
                },
              ]}
              style={{ width: "100%" }}
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
            </Form.Item>


            <Form.Item
              name="maxcount"
              label="Max Count"
              rules={[
                {
                  required: true,
                },
              ]}
              style={{ flex: 1 }} // Increase the width here
            >
              <InputNumber min={1} defaultChecked={1} />
            </Form.Item>



            <Form.Item
              name="rentperday"
              label="Rent per day"
              rules={[
                {
                  required: true,
                },
              ]}
              style={{ flex: 1, marginRight: "8px", width: '100%' }} // Increase the width here
            >
              <InputNumber min={1000} defaultChecked={1} />
            </Form.Item>

            {/* Image URLs */}
            <Form.Item
              name="imageurl1"
              label="Image url1"
              rules={[
                {
                  required: true,
                },
              ]}
              style={{ width: "100%" }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="imageurl2"
              label="Image url2"
              rules={[
                {
                  //required: true,
                },
              ]}
              style={{ width: "100%" }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="imageurl3"
              label="Image url3"
              rules={[
                {
                  //required: true,
                },
              ]}
              style={{ width: "100%" }}
            >
              <Input />
            </Form.Item>




            {/* Facilities */}
            <Form.Item
              name="facilities"
              label="Facilities"
              rules={[
                {
                  required: true,
                  message: "Facilities are required",
                },
              ]}
              style={{ width: "100%" }}
            >
              <Form.List name="facilities">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <div key={key} style={{ display: 'flex', marginBottom: '8px', alignItems: 'center' }}>
                        <Form.Item
                          {...restField}
                          name={[name, 'facility']}
                          fieldKey={[fieldKey, 'facility']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing facility',
                            },
                          ]}
                          style={{ flex: 1, marginRight: '8px' }}
                        >
                          <Input placeholder="Enter facility" />
                        </Form.Item>
                        <Button type="primary" onClick={() => remove(name)} style={{ marginBottom: '25px', color: 'white', backgroundColor: 'black', borderColor: 'black' }}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <div style={{ display: 'flex', marginBottom: '8px' }}>
                      <Button type="primary" onClick={() => add()} style={{ flex: 1, marginRight: '8px', color: 'white', backgroundColor: 'black', borderColor: 'black', maxWidth: '12%' }}>
                        Add Facility
                      </Button>
                    </div>
                  </>

                )}
              </Form.List>
            </Form.Item>


            {/* Buttons */}
            <Form.Item {...buttonLayout}>
              <Button
                type="primary"
                htmlType="submit"
                style={buttonStyle}
                className="mr-5"
              >
                Add Room
              </Button>
              <Button
                type="danger"
                htmlType="button"
                onClick={onReset}
                style={{ ...buttonStyle, marginRight: '10px' }}
                className="mr-5"
              >
                Reset All
              </Button>

            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AddRoom;