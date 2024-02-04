import OrderProcess from '../src/components/OrderProcess.vue'; 
import { shallowMount } from "@vue/test-utils";

describe('OrderProcess.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(OrderProcess);
    // Mock console.log to prevent logging during tests
    global.console.log = jest.fn();
  });

  it('advances to step 2 with valid customer data', async () => {
    // Set valid customer data
    wrapper.setData({
      customer: {
        customerInformation: {
          name: "Jane Doe",
          phone: "12345678",
          email: "jane.doe@example.com",
        }
      }
    });

    await wrapper.vm.validateDataCustomer();
    expect(wrapper.vm.step).toBe(2); // Should advance to the next step
    expect(console.log).not.toHaveBeenCalled(); // Ensure no error logs
  });

  it('does not advance to step 2 with invalid email', async () => {
    // Set invalid email
    wrapper.setData({
      customer: {
        customerInformation: {
          name: "Jane Doe",
          phone: "12345678",
          email: "invalid-email",
        }
      }
    });

    await wrapper.vm.validateDataCustomer();
    expect(wrapper.vm.step).toBe(1); // Should not advance due to invalid email
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Error in email validation"));
  });

  it('does not advance to step 2 with invalid phone', async () => {
    // Set invalid phone number
    wrapper.setData({
      customer: {
        customerInformation: {
          name: "Jane Doe",
          phone: "invalid-phone",
          email: "jane.doe@example.com",
        }
      }
    });

    await wrapper.vm.validateDataCustomer();
    expect(wrapper.vm.step).toBe(1); // Should not advance due to invalid phone
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Error in phone validation"));
  });

  // Additional tests can be added here for other validation cases
});
