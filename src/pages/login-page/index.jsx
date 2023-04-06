import { useContext, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";
import { AuthTokenContext } from "../../components/context/auth-token-context-provider";

export default function LoginPage() {
  const api = useApi();
  const authTokenContextValue = useContext(AuthTokenContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("1- useState hook yöntemi:", email, password);

  // 2- useRef hook yöntemi.
  const emailRef = useRef();
  const passwordRef = useRef();
  console.log("2- useRef yöntemi", emailRef, passwordRef);
  // 2- useRef yöntemi {current: input.form-control} {current: input.form-control}
  console.log("emailRef.current.value:", emailRef.current?.value);
  console.log("passwordRef.current.value:", passwordRef.current?.value);
  // soru işaretinin anlamı: Kendisinden önceki değer undefined veya null ise
  // kendisinden sonraki kısmın çalışmasını engeller. Bu sayede hata almaktan kurtuluruz.

  /**
   * Yukarıdaki iki yöntemi kullanarak inputların değerlerini alabiliyoruz. Ama biz daha
   * iyi bir yöntem olan üçüncü yöntemi kullanacağız.
   */

  // 3- Formu JSON'a çevirerek datanın alınması.

  const onFormSubmit = (event) => {
    event.preventDefault();

    // toast("Form submit oluyor");

    // Burada formu komple JSON'a çevirerek inputlardaki dataları tek seferde almış olacağız.
    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());

    console.log(">> Form JSON datası", formJson);
    /*
    >> Form JSON datası {email: 'test@test.com', password: '123456'}
    */

    api
      .post("auth/login", formJson)
      .then((response) => {
        console.log(">> Api Resp", response);

        authTokenContextValue.setToken(response.data.data.token);

        toast("Başarıyla giriş yapıldı.");
      })
      .catch((err) => {
        console.error(err);

        toast.error("Giriş yapılamadı, lütfen bilgilerinizi kontrol ediniz.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <Row className="justify-content-center">
          <Col sm="12" lg="4">
            <div className="form-group mb-3">
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <Form.Label>Şifre:</Form.Label>
              <Form.Control
                ref={passwordRef}
                type="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <Button variant="success" className="w-100" type="submit">
                <i className="fa-solid fa-paper-plane"></i>
                &nbsp; Gönder
              </Button>
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
}