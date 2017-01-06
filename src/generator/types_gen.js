module.exports = function types_gen (name) {
  var upname = name.toUpperCase();
  return (
    `export const ${upname}_REQUEST = '${upname}_REQUEST';
export const ${upname}_RESOLVE = '${upname}_RESOLVE';
export const ${upname}_REJECT  = '${upname}_REJECT';

export const CREATE_${upname}_RESOLVE = 'CREATE_${upname}_RESOLVE';
export const CREATE_${upname}_REJECT  = 'CREATE_${upname}_REJECT';

export const UPDATE_${upname}_RESOLVE = 'UPDATE_${upname}_RESOLVE';
export const UPDATE_${upname}_REJECT  = 'UPDATE_${upname}_REJECT';

export const REMOVE_${upname}_RESOLVE = 'REMOVE_${upname}_RESOLVE';
export const REMOVE_${upname}_REJECT  = 'REMOVE_${upname}_REJECT';`
  )
}
