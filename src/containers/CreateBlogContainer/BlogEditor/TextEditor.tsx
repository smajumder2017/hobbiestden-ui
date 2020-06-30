import React, {useState} from "react";
import { Drawer, Button } from "antd";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML, Options } from "draft-js-export-html";
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface ICustomOptions extends Options {
  inlineStyleFn?: any
}
let options: ICustomOptions = {
  inlineStyles: {
    // Override default element (`strong`).
    BOLD: { element: "b" },

  },
  inlineStyleFn: (styles: any) => {
    let colorKey = 'color-';
    let fontSizeKey = 'fontsize-';
    let color = styles.filter((value: any) => value.startsWith(colorKey)).first();
    let fontSize = styles.filter((value: any) => value.startsWith(fontSizeKey)).first();
    const style: {color?:string, fontSize?: string} = {};
    if(color) style.color = color.replace(colorKey, '');
    if(fontSize) style.fontSize = fontSize.replace(fontSizeKey, '');

    if (color) {
      return {
        // element: 'span',
        style,
      };
    }
    if(fontSize) {
      return {
        style,
      }
    }
  },
  blockStyleFn: (block) => {
    if (block.getData().get('text-align')) {
      return {
        style: {
          textAlign: block.getData().get('text-align'),
        },
      }
    }
    if (block.getType().endsWith('-list-item')) {
      let fontSizeKey = 'fontsize-';
      let fontSize = block.getInlineStyleAt(1).filter((value: any) => value.startsWith(fontSizeKey)).first();
      const style: {color?:string, fontSize?: string, marginBottom?:string} = {};
      if(fontSize) style.fontSize = fontSize.replace(fontSizeKey, '');
      style.marginBottom = '5px'
      return {
        style
      }
    }
  }
};

interface ITextEditor {
  drwaerState: boolean;
  handleClose: () => void;
  onEditorChange: (editorHtmlState: string)=> void;
  value?: string;
}

export const TextEditor: React.FC<ITextEditor> = (props) => {
  const blocksFromHtml = htmlToDraft(props.value || '');
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    console.log(convertToRaw(editorState.getCurrentContent()));
    // console.log(stateToHTML(editorState.getCurrentContent(), options));
    props.onEditorChange(stateToHTML(editorState.getCurrentContent(), options));
  };
  return (
    <Drawer
      title="Edit Your Content Here"
      // width={720}
      height={400}
      placement={'bottom'}
      onClose={props.handleClose}
      visible={props.drwaerState}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={props.handleClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={props.handleClose} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <div className="editor" style={{boxShadow: 'none'}}>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true }
          }}
        />
      </div>
    </Drawer>
  );
};
