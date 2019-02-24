import { Editor } from "slate-react";
import { Block, Value } from "slate";
import { Grid, Typography } from "@material-ui/core";

import React from "react";
import initialValueAsJson from "./value.json";
import Subtitle from "./Subtitle";
import Dialogue from "./Dialogue";
//import Hotkeys from "./helpers/hotkey";
//import f1 from "./shortcuts/timecodeShortcuts";
//import AutoReplace from "./helpers/AutoReplace";

/**
 * Deserialize the initial editor value.
 *
 * @type {Object}
 *
 */
const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "subtitle",
        data: {
          timecode: "10:25:31:26",
          lineLengthLimit: 42
        },
        nodes: [
          {
            type: "line",
            object: "block",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "Subtitle 1!"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});

/*
const plugins = [
  AutoReplace({
    trigger: "space",
    before: /^(>)$/,
    editor: (editor, e, matches) => {
      return console.log(editor, e, matches);
    }
  })
];
*/

/**
 * A simple schema to enforce the nodes in the Slate document.
 *
 * @type {Object}
 

const schema = {
  document: {
    nodes: [
      {
        match: { type: "subtitle" },
        min: 1,
        first: "subtitle",
        last: "subtitle"
      }
    ],
    normalize: (editor, { error, node }) => {
      console.log(error, node);
    }
  },
  blocks: {
    subtitle: {
      nodes: [
        { match: { type: "line" }, min: 1, max: 2, first: "line", last: "line" }
      ],
      normalize: (editor, { code, index, count, limit, node, rule }) => {
        console.log(code, index, count, limit, node, rule);
        switch (code) {
          case "child_type_invalid": {
            console.log(code, node);
          }
          case "child_min_invalid": {
            console.log(code, node);
          }
          case "child_max_invalid": {
            console.log(code, node);
            editor.insertNodeByKey(node.key, index, {
              object: "block",
              type: "subtitle",
              data: {
                timecode: "10:25:31:26",
                lineLengthLimit: 42
              },
              nodes: [
                {
                  type: "line",
                  object: "block",
                  nodes: [
                    {
                      object: "text",
                      leaves: [
                        {
                          text: "Subtitle 1!"
                        }
                      ]
                    }
                  ]
                }
              ]
            });
          }
          default:
            console.log(code, node);
        }
      }
    }
  }
};

/**
 * The Test Subtitle Editor example.
 *
 * @type {Component}
 */

class TestEditor extends React.Component {
  /**
   * On key down inside code blocks, insert timecode.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @param {Function} next
   */

  onKeyDown = (event, editor, next) => {
    const { props } = editor;
    const { attributes, children, node } = props;
    const subtitle = {
      object: "block",
      type: "subtitle",
      data: {
        timecode: "10:25:31:30",
        lineLengthLimit: 42
      }
    };
    console.log(event.key, node.key);
    switch (event.key) {
      case "F2":
        event.preventDefault();
        editor.insertNodeByKey(node.key, 0, subtitle);
        //editor.setNodeByKey(parentBlock.key, subtitle);
        break;
      case "F1":
        event.preventDefault();
        const { value } = editor;
        const { document, startBlock } = value;
        const parentBlock = document.getParent(startBlock.key);
        editor.setNodeByKey(parentBlock.key, subtitle);
        break;
      default:
        return next();
    }
  };

  /**
   * Render.
   *
   * @return {Component}
   */

  render() {
    return (
      <Editor
        placeholder="Enter a title..."
        defaultValue={initialValue}
        renderNode={this.renderNode}
        onKeyDown={this.onKeyDown}
        //schema={schema}
        //plugins={plugins}
      />
    );
  }

  /**
   * Render Slate nodes.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props;

    console.log(props);

    const opts = {
      lineLength: props.node.text.length,
      lineLengthLimit: 42,
      startTC: props.node.data.get("timecode"),
      dialogue: props.children
    };

    switch (node.type) {
      case "subtitle":
        return (
          <Subtitle
            tc={props.node.data.get("timecode")}
            style={{ boxShadow: props.selected ? "0 0 0 2px blue;" : "none" }}
            {...attributes}
          >
            {children}
          </Subtitle>
        );
      case "line":
        return (
          <Dialogue len={node.text.length} {...attributes}>
            {children}
          </Dialogue>
        );
      default:
        return next();
    }
  };
}

/**
 * Export.
 */

export default TestEditor;
