const ServiceOption = require('../models/serviceOption.model'); // Đảm bảo đường dẫn đúng đến model ServiceOption
const sequelize = require('../utils/sequelize.util'); // Đảm bảo bạn có sequelize để kết nối DB

async function createServiceOption() {
  try {
    const serviceOptions = [
      // ServiceId 1 - Switch Modding Preference
      {
        serviceId: 1,
        optionName: 'Lube',
        price: 5000,
        isMultiple: true,
        optionGroup: 'Switch Modding Preference',
      },
      {
        serviceId: 1,
        optionName: 'Films',
        price: 3000,
        isMultiple: true,
        optionGroup: 'Switch Modding Preference',
      },
      {
        serviceId: 1,
        optionName: 'Springs Change',
        price: 1000,
        isMultiple: true,
        optionGroup: 'Switch Modding Preference',
      },
      {
        serviceId: 1,
        optionName: 'Clean',
        price: 4000,
        isMultiple: true,
        optionGroup: 'Switch Modding Preference',
      },

      // ServiceId 1 - My Spring Preference
      {
        serviceId: 1,
        optionName: 'Payson',
        price: 3000,
        isMultiple: false,
        optionGroup: 'My Spring Preference',
      },
      {
        serviceId: 1,
        optionName: 'Geon',
        price: 2500,
        isMultiple: false,
        optionGroup: 'My Spring Preference',
      },
      {
        serviceId: 1,
        optionName: 'TX',
        price: 3000,
        isMultiple: false,
        optionGroup: 'My Spring Preference',
      },
      {
        serviceId: 1,
        optionName: 'Chewy',
        price: 3000,
        isMultiple: false,
        optionGroup: 'My Spring Preference',
      },
      {
        serviceId: 1,
        optionName: 'SPRiT',
        price: 4000,
        isMultiple: false,
        optionGroup: 'My Spring Preference',
      },

      // ServiceId 2 - Desoldering Options
      {
        serviceId: 2,
        optionName: 'Less than 60 %',
        price: 150000,
        isMultiple: false,
        optionGroup: 'Desoldering',
      },
      {
        serviceId: 2,
        optionName: '60 - 65%',
        price: 200000,
        isMultiple: false,
        optionGroup: 'Desoldering',
      },
      {
        serviceId: 2,
        optionName: '75% - TKL',
        price: 250000,
        isMultiple: false,
        optionGroup: 'Desoldering',
      },
      {
        serviceId: 2,
        optionName: 'TKL +',
        price: 300000,
        isMultiple: false,
        optionGroup: 'Desoldering',
      },
      {
        serviceId: 2,
        optionName: 'None',
        price: 0,
        isMultiple: false,
        optionGroup: 'Desoldering',
      },

      // ServiceId 2 - Assembly Options
      {
        serviceId: 2,
        optionName: 'Less than 60 %',
        price: 350000,
        isMultiple: false,
        optionGroup: 'Assembly',
      },
      {
        serviceId: 2,
        optionName: '60 - 65%',
        price: 400000,
        isMultiple: false,
        optionGroup: 'Assembly',
      },
      {
        serviceId: 2,
        optionName: '75% - TKL',
        price: 500000,
        isMultiple: false,
        optionGroup: 'Assembly',
      },
      {
        serviceId: 2,
        optionName: 'TKL +',
        price: 600000,
        isMultiple: false,
        optionGroup: 'Assembly',
      },
      {
        serviceId: 2,
        optionName: 'Hotswap all size',
        price: 250000,
        isMultiple: false,
        optionGroup: 'Assembly',
      },
    ];

    // Kiểm tra và chèn ServiceOption nếu chưa có
    for (const option of serviceOptions) {
      const existingOption = await ServiceOption.findOne({
        where: { serviceId: option.serviceId, optionName: option.optionName },
      });

      if (!existingOption) {
        await ServiceOption.create({
          serviceId: option.serviceId,
          optionName: option.optionName,
          price: option.price,
          isMultiple: option.isMultiple,
          optionGroup: option.optionGroup,
          createdAt: sequelize.fn('NOW'),
          updatedAt: sequelize.fn('NOW'),
        });
        console.log(`ServiceOption "${option.optionName}" for serviceId ${option.serviceId} created.`);
      } else {
        console.log(`ServiceOption "${option.optionName}" already exists for serviceId ${option.serviceId}.`);
      }
    }
  } catch (err) {
    console.error('Error creating service options:', err);
  }
}

module.exports = createServiceOption;
