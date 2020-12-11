import React from "react";
import { Form, Input, Button, Mentions } from "antd";
import "./comments.css";

interface IOwnProps {
  onChange: (text: string) => void;
  value: string;
  onSubmit: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  submitting?: boolean;
  submitText?: string;
  onCancel?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  mentions?: Array<{ name: string; userId: string }>;
  defaultMention?: { name: string; userId: string };
  placeholder?: string
}

export const Editor: React.FC<IOwnProps> = ({
  onChange,
  onSubmit,
  submitting,
  value,
  submitText,
  onCancel,
  mentions,
  defaultMention,
  placeholder
}) => (
  <div className="commentbox">
    <Form.Item>
      <Mentions
        rows={3}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultMention ? "@" + defaultMention?.name + " " : ""}
        value={value}
      >
        {mentions?.length &&
          mentions.map((user) => (
            <Mentions.Option value={user.userId}>{user.name}</Mentions.Option>
          ))}
      </Mentions>
      {/* <Input.TextArea rows={4} onChange={onChange} value={value} /> */}
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        {submitText || "Add Comment"}
      </Button>
      {onCancel && (
        <Button htmlType="button" onClick={onCancel} type="default">
          Cancel
        </Button>
      )}
    </Form.Item>
  </div>
);
