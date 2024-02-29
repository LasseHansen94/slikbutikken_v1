
// vi importerer vores shallowmount
import { shallowMount } from "@vue/test-utils";
// så bruger vi jest til at mocke databasen
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn(() => ({

    firestore: jest.fn(() => ({

    })),
    storage: jest.fn(() => ({

    })),
  })),
}));
// vi mocker både vores firestore og storage med billeder.
jest.mock('firebase/compat/firestore', () => ({

}));
jest.mock('firebase/compat/storage', () => ({

}));

import OrderProcess from '../src/components/OrderProcess.vue';

describe('OrderProcess.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(OrderProcess);
    // Mock console.log for at forhindre logging under tests
    global.console.log = jest.fn();
  });

  it('step 1 til step 2 tester for korrekt kundeinformation', async () => {
    // Set korrekt kundedata
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
    expect(console.log).not.toHaveBeenCalled(); // for at sikre dig at console log ikke bliver kaldt.
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
    expect(wrapper.vm.step).toBe(1); 
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
    expect(wrapper.vm.step).toBe(1); // den skal ikke gå til step 2 grundet forkert telefonnummer
    console.log("fejl i telefonnummer");
    // expect(console.log).toHaveBeenCalledWith(expect("error in phone validation"));

  });
});
