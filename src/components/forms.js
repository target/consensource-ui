'use strict'

const m = require('mithril')
const isoLangCodes = require('App/views/common/ISO-639-1-language.json')

const inputField = (name, label, value, oninput, type = 'text') => 
  m('div.form-group', [
    m(`label[for=${name}]`, label),
    m("input.form-control", {
      oninput: m.withAttr("value", oninput),
      value,
      type,
      name: name,
    }),
  ])

const languageSelector = (name, label, value, onchange) =>
  m('div.form-group', [
    m(`label[for=${name}]`, label),
    m("select.form-control.mb-2", {
      name,
      oninput: m.withAttr("value", onchange),
      value: value,
    }, isoLangCodes.map(({code, name}) => m('option', {value: code, text: name}))),
  ])

module.exports = {
  inputField,
  languageSelector
}
