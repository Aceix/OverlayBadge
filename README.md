# OverlayBadge
OverlayBadge is a simple minimal lightweight badge component for Vue.js 2.x

### Install

NPM: `npm install --save @the_aceix/overlay-badge`

Yarn: `yarn add @the_aceix/overlay-badge`

### Props
 - _type_ (String) - type of badge (conforms to Bootstrap). Possible values are `primary`|`secondary`|`success`|`info`|`warning`|`danger`
 - _count_ (Number | String) - the value to be displayed in badge - default `0`
 - _position_ (String) - defines the corner the badge will show (possible values are `top-right`|`top-left`|`bottom-right`|`bottom-left`) - default `top-right`
 - _onClick_ (Function) - the callback to be fired when the badge is clicked - default `undefined`

### Slots
 - _default_ - component or element which the badge will show on
 - _float_ - the badge

Contribution
----
Project is open to suggestions. To contribute:
 1. Fork the repo
 2. Edit source
 3. Raise an issue, linking to your repo

License
----
MIT

