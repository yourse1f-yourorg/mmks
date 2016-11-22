import { Mongo } from 'meteor/mongo';

import { User } from './user.js';
import { Color, _colors } from './color.js';
import { Widget, _widgets } from './widget.js';

import { AccessControl as acl, TrustLevel as tl } from './access_control.js';

export const Users = User;

export const Colors = Color;
export const _Colors = _colors;

export const Widgets = Widget;
export const _Widgets = _widgets;

export const AccessControl = acl;
export const TrustLevel = tl;


export const Posts = new Mongo.Collection('posts');
export const Comments = new Mongo.Collection('comments');
