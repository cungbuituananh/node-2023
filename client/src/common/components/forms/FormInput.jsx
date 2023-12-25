const { Form, Input } = require("antd");

const FormInput = ({
  colorLabel = "white",
  labelName,
  labelCol = 24,
  wrapperCol = 24,
  name,
  rules = [],
  require = false,
  typeInput = "text",
}) => {
  return (
    <Form.Item
      label={<label style={{ color: colorLabel }}>{labelName}</label>}
      labelCol={{ span: labelCol }}
      wrapperCol={{ span: wrapperCol }}
      name={name}
      rules={
        require
          ? [
              ...rules,
              {
                required: true,
                message: `Please input your ${labelName}!`,
              },
            ]
          : [...rules]
      }
    >
      {typeInput === "text" ? <Input /> : <Input.Password />}
    </Form.Item>
  );
};

export default FormInput;
