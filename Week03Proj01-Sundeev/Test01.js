describe(" Unit test ", function() {
  it("getNine() expect to be 9", function() {
    expect(NumberGetter.getNine()).toBe(9);
  });
  
  it("expect to get 8", function() {
    expect(NumberGetter.getEight()).toBe(8);
  });
  
});