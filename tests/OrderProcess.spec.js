import { shallowMount } from "@vue/test-utils"; 
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn(() => ({
    // Mock other Firebase services as needed
    firestore: jest.fn(() => ({
      // Mock Firestore methods if used
    })),
    storage: jest.fn(() => ({
      // Mock Storage methods if used
    })),
  })),
}));
jest.mock('firebase/compat/firestore', () => ({
  // Provide any mock exports here if needed
}));
jest.mock('firebase/compat/storage', () => ({
  // Provide any mock exports here if needed
}));

import OrderProcess from '../src/components/OrderProcess.vue'; 

describe('OrderProcess.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(OrderProcess);
    // Mock console.log to prevent logging during tests
    global.console.log = jest.fn();
  });

  it('step 1 til step 2 tester for korrekt kundeinformation', async () => {
    // Set valid customer data
    wrapper.setData({
      customer: {
        customerInformation: {
          name: "Anders Jensen",
          phone: "12345678",
          email: "Anders_Jensen@hotmail.com",
        }
      }
    });

    await wrapper.vm.validateDataCustomer();
    expect(wrapper.vm.step).toBe(2); 
    expect(console.log).not.toHaveBeenCalled(); // Ensure no error logs
  });

  it('tester med forkert email som skal fejle', async () => {
    // Set invalid email
    wrapper.setData({
      customer: {
        customerInformation: {
          name: "Mads Hansen",
          phone: "50478301",
          email: "madsHansengmail.com",
        }
      }
    });

    await wrapper.vm.validateDataCustomer();
    expect(wrapper.vm.step).toBe(1); // Should not advance due to invalid email
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Error in email validation"));
  });

  it('tester med forkert telefonnummer', async () => {
    // Set invalid phone number
    wrapper.setData({
      customer: {
        customerInformation: {
          name: "David Andersen",
          phone: "invalid-phone",
          email: "David.david@outlook.com",
        }
      }
    });

    await wrapper.vm.validateDataCustomer();
    expect(wrapper.vm.step).toBe(1); // Should not advance due to invalid phone
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Error in phone validation"));
  });

  // Additional tests can be added here for other validation cases
});
