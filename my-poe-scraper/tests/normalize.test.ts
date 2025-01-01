const { normalizeModifiers } = require('../src/normalize');

describe('normalizeModifiers', () => {
  it('should normalize modifiers correctly', () => {
    const modifierMap = {
      '+20% increased attack speed': 'increased_attack_speed_t1',
      '+40 to maximum life': 'maximum_life_t2'
    };

    const modifiers = ['+20% increased attack speed', '+40 to maximum life'];
    const normalized = normalizeModifiers(modifiers, modifierMap);

    expect(normalized).toEqual(['increased_attack_speed_t1', 'maximum_life_t2']);
  });

  it('should return the same modifier if not found in the map', () => {
    const modifierMap = {
      '+20% increased attack speed': 'increased_attack_speed_t1'
    };

    const modifiers = ['+20% increased attack speed', 'unknown modifier'];
    const normalized = normalizeModifiers(modifiers, modifierMap);

    expect(normalized).toEqual(['increased_attack_speed_t1', 'unknown modifier']);
  });
});
