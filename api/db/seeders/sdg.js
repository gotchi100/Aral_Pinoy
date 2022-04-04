'use strict'

const debug = require('debug')

const SdgModel = require('../../models/sdgs')

const logger = debug('api:server')

const sdgs = [
  {
    name: '#1 No Poverty',
    norm: '#1 no poverty',
    description: 'End poverty in all its forms everywhere',
    imageUrl: 'https://i2.wp.com/www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-01.png',
    questions: [
      {
        label: 'Did this provide access to basic services and necessities to people?',
        type: 'polar'
      },
      {
        label: 'Did this reduce exposure and vulnerability to climate-related extreme events and other economic, social and environmental shocks and disasters to the people?',
        type: 'polar'
      }
    ]
  },
  {
    name: '#4 Quality Education',
    norm: '#4 quality education',
    description: 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all',
    imageUrl: 'https://i2.wp.com/www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-04.png',
    questions: [
      {
        label: 'Did this help in reducing gender disparities in education and ensure equal access to all levels of education and vocational training for the vulnerable, including persons with disabilities, indigenous peoples and children in vulnerable situations?',
        type: 'polar'
      },
      {
        label: 'Did this teach knowledge and skills needed to promote sustainable development, including, among others, through education for sustainable development and sustainable lifestyles, human rights, gender equality, promotion of a culture of peace and non-violence, global citizenship and appreciation of cultural diversity and of culture’s contribution to sustainable development?',
        type: 'polar'
      }
    ]
  },
  {
    name: '#13 Climate Action',
    norm: '#13 climate action',
    description: 'Take urgent action to combat climate change and its impacts',
    imageUrl: 'https://i2.wp.com/www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-13.png',
    questions: [
      {
        label: 'Did this strengthen resilience and adaptive capacity to climate related hazards and natural disasters in the area?',
        type: 'polar'
      },
      {
        label: 'Did this Integrate climate change measures into strategies and planning in the area?',
        type: 'polar'
      },
      {
        label: 'Did this Improve education, awareness-raising and human and institutional capacity on climate change mitigation, adaptation, impact reduction and early warning in the area?',
        type: 'polar'
      }
    ]
  }
]

async function initialize() {
  for (const sdg of sdgs) {
    const { upsertedCount } = await SdgModel.updateOne({
      norm: sdg.norm
    }, {
      $setOnInsert: sdg
    }, {
      upsert: true
    })

    if (upsertedCount > 0) {
      logger(`Seeded SDG: ${sdg.norm}`)
    }
  }
}

module.exports = initialize
