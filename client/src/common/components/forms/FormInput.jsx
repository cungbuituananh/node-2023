const { Form, Input } = require("antd");

const FormInput = ({
  require = false,
  name,
  label,
  rules = [],
  typeInput = "text",
}) => {
  return (
    <Form.Item
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      label={<label style={{ color: "white" }}>{label}</label>}
      name={name}
      rules={
        require
          ? [
              ...rules,
              {
                required: true,
                message: "Please input your username!",
              },
            ]
          : rules
      }
    >
      {typeInput === "text" ? <Input /> : <Input.Password />}
    </Form.Item>
  );
};

export default FormInput;
