export const symptomCategories = {
  hepatic: {
    label: 'Liver (Hepatic)',
    description: 'Symptoms related to liver dysfunction',
  },
  neurological: {
    label: 'Neurological',
    description: 'Symptoms affecting the nervous system',
  },
  psychiatric: {
    label: 'Psychiatric',
    description: 'Mental health and behavioral symptoms',
  },
  other: {
    label: 'Other',
    description: 'Additional symptoms and signs',
  },
};

export const symptoms = [
  // Hepatic symptoms
  {
    id: 'jaundice',
    name: 'Jaundice',
    category: 'hepatic',
    description: 'Yellowing of the skin or eyes',
    weight: 2,
  },
  {
    id: 'abdominal-pain',
    name: 'Abdominal Pain',
    category: 'hepatic',
    description: 'Pain in the upper right abdomen',
    weight: 1,
  },
  {
    id: 'fatigue',
    name: 'Fatigue',
    category: 'hepatic',
    description: 'Persistent tiredness or weakness',
    weight: 1,
  },
  {
    id: 'nausea',
    name: 'Nausea/Vomiting',
    category: 'hepatic',
    description: 'Feeling sick or vomiting',
    weight: 1,
  },
  {
    id: 'ascites',
    name: 'Ascites',
    category: 'hepatic',
    description: 'Fluid buildup in the abdomen',
    weight: 3,
  },
  
  // Neurological symptoms
  {
    id: 'tremor',
    name: 'Tremor',
    category: 'neurological',
    description: 'Shaking, especially in hands',
    weight: 3,
  },
  {
    id: 'dysarthria',
    name: 'Speech Difficulties',
    category: 'neurological',
    description: 'Slurred or slow speech',
    weight: 3,
  },
  {
    id: 'dystonia',
    name: 'Dystonia',
    category: 'neurological',
    description: 'Sustained muscle contractions causing abnormal postures',
    weight: 3,
  },
  {
    id: 'difficulty-walking',
    name: 'Difficulty Walking',
    category: 'neurological',
    description: 'Unsteady gait or coordination problems',
    weight: 2,
  },
  {
    id: 'drooling',
    name: 'Drooling',
    category: 'neurological',
    description: 'Excessive drooling or difficulty swallowing',
    weight: 2,
  },
  
  // Psychiatric symptoms
  {
    id: 'depression',
    name: 'Depression',
    category: 'psychiatric',
    description: 'Persistent sadness or loss of interest',
    weight: 1,
  },
  {
    id: 'anxiety',
    name: 'Anxiety',
    category: 'psychiatric',
    description: 'Excessive worry or nervousness',
    weight: 1,
  },
  {
    id: 'personality-change',
    name: 'Personality Changes',
    category: 'psychiatric',
    description: 'Noticeable changes in behavior or personality',
    weight: 2,
  },
  {
    id: 'cognitive-decline',
    name: 'Cognitive Decline',
    category: 'psychiatric',
    description: 'Memory problems or difficulty concentrating',
    weight: 2,
  },
  
  // Other symptoms
  {
    id: 'kayser-fleischer',
    name: 'Kayser-Fleischer Rings',
    category: 'other',
    description: 'Brown or greenish ring around the cornea (seen during eye exam)',
    weight: 5,
  },
  {
    id: 'anemia',
    name: 'Hemolytic Anemia',
    category: 'other',
    description: 'Anemia due to breakdown of red blood cells',
    weight: 2,
  },
  {
    id: 'kidney-issues',
    name: 'Kidney Problems',
    category: 'other',
    description: 'Signs of kidney dysfunction',
    weight: 1,
  },
];
