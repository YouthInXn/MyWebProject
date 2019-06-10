import React from 'react'
import Editor from 'wangeditor'
import './editor.css'
import {showMessage} from '../Notices/NoticeMessage'
import _ from 'lodash'

class WangEditor extends React.Component {
  constructor(props) {
    super(props)
    this.editorElem = React.createRef()
  }
  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (_.isEqual(nextProps.style, this.props.style) &&
      _.isEqual(nextProps.defaultValue, this.props.defaultValue) &&
    _.isEqual(nextProps.disabled, this.props.disabled)) {
      return false
    }
    return true
  }
  componentDidMount () {
    const elem = this.editorElem.current
    const editor = new Editor(elem)
    // 添加监听
    editor.customConfig.onchange = (html) => {
      typeof this.props.onChange === 'function' && this.props.onChange(html, editor.txt.text())
    }
    // editor.customConfig.debug = window.location.href.indexOf('localhost') >= 0 // debug
    editor.customConfig.uploadImgServer = '/upload' // 文件上传
    editor.customConfig.uploadImgMaxLength = 5 // 最多上传五张
    editor.customConfig.customAlert = (info) => {
      showMessage({ msg:info, delay:2000 })
    } // 自定义提示
    editor.customConfig.zIndex = 1
    editor.customConfig.menus = [
      //   'head',  // 标题
      'bold',  // 粗体
      //   'fontSize',  // 字号
      //   'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      //   'foreColor',  // 文字颜色
      //   'backColor',  // 背景颜色
      'link',  // 插入链接
      //   'list',  // 列表
      //   'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
      'image',  // 插入图片
      //   'table',  // 表格
      'video',  // 插入视频
      'code',  // 插入代码
      // 'undo',  // 撤销
      // 'redo'  // 重复
    ]
    editor.create()
  }
  render () {
    const { style, defaultValue, disabled } = this.props
    return <div style={{ cursor:disabled ? 'no-drop' : 'auto' }}>
      <div
        className={disabled ? 'my-wangeditor-disabled' : 'my-wangeditor'}
        ref={this.editorElem}
        style={style}
      >
        {
          defaultValue ? <p>{defaultValue}</p> : null
        }
      </div>
    </div>
  }
}

export default WangEditor
