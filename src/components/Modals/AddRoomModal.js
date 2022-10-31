import React, { useContext } from "react";
import { Form, Input, Modal } from "antd";
import { AppContext } from "../../context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../context/AuthProvider";

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();
  const handleOK = () => {
    addDocument("rooms", {
      ...form.getFieldsValue(),
      members: [uid]
    });
    form.resetFields();
    setIsAddRoomVisible(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  };
  return (
    <div>
      <Modal
        title="Tạo phòng"
        open={isAddRoomVisible}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <Form form={form} layout={"vertical"}>
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng"></Input>
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input placeholder="Nhập mô tả"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
