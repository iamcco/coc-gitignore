# gitignore extension for coc

> templates from [https://github.com/dvcs/gitignore](https://github.com/dvcs/gitignore)

## Install

``` vim
CocInstall coc-gitignore
```

## Usage

``` vim
CocList gitignore
```

actions:

- append (default): add gitignore rules to `.gitignore` file of
current workspace directory

## Config

coc-settings.json

``` jsonc
"gitignore.enable": {
  "type": "boolean",
  "default": true,
  "description": "Is enable gitignore"
},
"gitignore.templates.patch": {
  "type": "object",
  "default": {},
  "additionalProperties": {
    "type": "string"
  },
  "description": "gitignore patch for exists templates (key and value format)"
},
"gitignore.templates.replace": {
  "type": "object",
  "default": {},
  "additionalProperties": {
    "type": "string"
  },
  "description": "gitignore completely replace the exists templates (key and value format)"
}
```

### Buy Me A Coffee ☕️

![btc](https://img.shields.io/keybase/btc/iamcco.svg?style=popout-square)

![image](https://user-images.githubusercontent.com/5492542/42771079-962216b0-8958-11e8-81c0-520363ce1059.png)
