import React, { useContext, useMemo, useState } from "react";
import { Avatar, Form, Modal, Select, Spin } from "antd";
import { AppContext } from "../../context/AppProvider";
import { debounce } from "lodash";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);
      fetchOptions(value, props.curmembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, props.curmembers]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((otp) => {
        return (
          <Select.Option key={otp.value} value={otp.value} title={otp.label}>
            <Avatar size={"small"} src={otp.photoURL}>
              {otp.photoURL ? "" : otp.label?.charAt(0).toUpperCase()}
            </Avatar>
            {`${otp.label}`}
          </Select.Option>
        );
      })}
    </Select>
  );
}

async function fetchUserLists(search, curMembers) {
  const dbRef = collection(db, "users");
  const querySearch = query(
    dbRef,
    where("keywords", "array-contains", search),
    orderBy("displayName"),
    limit(20)
  );
  return getDocs(querySearch).then((snapshot) => {
    return snapshot.docs
      .map((doc) => ({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL,
      }))
      .filter((otp) => curMembers.includes(otp.value));
  });
}
export default function InviteMemberModal() {
  const [value, setValue] = useState([]);
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomID,
    selectedRoom,
  } = useContext(AppContext);
  const [form] = Form.useForm();
  const handleOK = () => {
    form.resetFields();

    // update members in current room
    const roomRef = doc(db, "rooms", selectedRoomID);
    updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });
    setIsInviteMemberVisible(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsInviteMemberVisible(false);
  };
  return (
    <div>
      <Modal
        title="Mời thêm thành viên"
        open={isInviteMemberVisible}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <Form form={form} layout={"vertical"}>
          <DebounceSelect
            mode="multiple"
            label="Tên các thành viên"
            value={value}
            placeholder="Nhập tên các thành viên"
            fetchOptions={fetchUserLists}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curmembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
}
