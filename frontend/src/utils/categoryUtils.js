const categoryMapping = {
  Beras: 'Beras',
  Daging: 'Daging',
  Ikan: 'Ikan',
  Telur: 'Telur',
  Bawang: 'Bumbu',
  Cabai: 'Bumbu',
  Minyak: 'Minyak Goreng',
  Gula: 'Gula',
  Garam: 'Bumbu',
  Tepung: 'Tepung',
  Kacang: 'Sayuran',
  Sayuran: 'Sayuran',
  Buah: 'Buah',
  Susu: 'Susu',
};

const categoryIcons = {
  Beras: 'rice_bowl',
  Daging: 'kebab_dining',
  Ikan: 'set_meal',
  Telur: 'egg',
  Bumbu: 'blender',
  'Minyak Goreng': 'oil_barrel',
  Gula: 'cake',
  Tepung: 'flour',
  Sayuran: 'eco',
  Buah: 'local_florist',
  Susu: 'local_drink',
};

export const getCategory = (commodityName) => {
  for (const key in categoryMapping) {
    if (commodityName.toLowerCase().includes(key.toLowerCase())) {
      return categoryMapping[key];
    }
  }
  return 'Lainnya';
};

export const getCategoryIcon = (category) => {
  return categoryIcons[category] || 'widgets';
};
