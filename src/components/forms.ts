import * as m from 'mithril';
import * as isoLangCodes from 'App/views/common/ISO-639-1-language.json';

export const inputField = (name: string, label: string, value: string, oninput: Function, type = 'text') =>
    m('div.form-group', [
        m(`label[for=${name}]`, label),
        m('input.form-control', {
            oninput: (e: any) => oninput(e.target.value),
            value,
            type,
            name: name,
        }),
    ]);

export const languageSelector = (name: string, label: string, value: string, onchange: Function) =>
    m('div.form-group', [
        m(`label[for=${name}]`, label),
        m(
            'select.form-control.mb-2',
            {
                name,
                oninput: (e: any) => onchange(e.target.value),
                value: value,
            },
            isoLangCodes.map(({ code, name }) => m('option', { value: code, text: name })),
        ),
    ]);
