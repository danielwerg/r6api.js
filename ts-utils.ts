/* This files contains some useful type-checking functions
You can require this file with:
- require('r6api.js/ts-utils')
- import * as utils from 'r6api.js/ts-utils'
- import { functionName } from 'r6api.js/ts-utils'
*/

import { oldRankNumber, operator, rankNumber, seasonNumber, weaponName, weaponType } from './typings/autogen'
import * as constants from './lib/constants'


export function isOldRankNumber(value: number): value is oldRankNumber {
  return typeof value == 'number'
    && Object.keys(constants.OLD_RANKS).map(parseInt).includes(value)
}

export function isOperator(value: string): value is operator {
  return typeof value == 'string'
    && constants.OPERATORS.map(op => op.name).includes(value)
}

export function isRankNumber(value: number): value is rankNumber {
  return typeof value == 'number'
    && Object.keys(constants.RANKS).map(parseInt).includes(value)
}

export function isSeasonNumber(value: number): value is seasonNumber {
  return typeof value == 'number'
    && Object.keys(constants.SEASONS).map(parseInt).includes(value)
}

export function isWeaponName(value: string): value is weaponName {
  return typeof value == 'string'
    && constants.WEAPONS.map(wp => wp.name).includes(value)
}

export function isWeaponType(value: string): value is weaponType {
  return typeof value == 'string'
    && Object.values(constants.WEAPONTYPES).includes(value)
}