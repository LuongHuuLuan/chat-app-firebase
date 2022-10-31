import React from "react";
import { Button, Col, Row, Typography } from "antd";
import { auth } from "../../firebase/config";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { addDocument, generateKeywords } from "../../firebase/services";

const { Title } = Typography;
const fbProvider = new FacebookAuthProvider();

export default function Login() {
  const handleFBLogin = async () => {
    const { user, _tokenResponse } = await signInWithPopup(auth, fbProvider);
    if (_tokenResponse?.isNewUser) {
      const { displayName, email, uid, providerId, photoURL } = user;
      addDocument("users", {
        displayName,
        email,
        uid,
        photoURL,
        providerId,
        keywords: generateKeywords(user.displayName),
      });
    }
  };

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            App chat
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Đăng nhập bằng Google
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFBLogin}>
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
