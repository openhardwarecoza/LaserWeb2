var expect = require('chai').expect;
var Grbl = require('./../js/grbl.js');
var grbl = new Grbl();

describe('Grbl', function () {
	it('should be a function', function () {
		expect(Grbl).to.be.a('function');
	})
})

describe('grbl = new Grbl()', function () {
	it('should be an object', function () {
		expect(grbl).to.be.a('object');
	})
	it('should initially not be initiated', function (){
		expect(grbl.initiated).to.equal(false);
	})
	describe('grbl should have functions', function () {
		it('should have a setVersion function', function () {
			expect(grbl.setVersion).to.be.a('function')
		})
		it('should have a setVersion function that sets the version and returns te version', function () {
			expect(grbl.setVersion('9.01')).to.equal('9.01');
			expect(grbl.version).to.equal('9.01');
		})
		it('should have a parseData function', function () {
			expect(grbl.parseData).to.be.a('function')
		})
		it('should have a parseData function that parses grbl messages', function () {
			expect(grbl.parseData('ok').messageType).to.equal('ok');
			expect(grbl.parseData('error:').messageType).to.equal('error');
			expect(grbl.parseData('$$ [view Grbl settings]').messageType).to.equal('control');
			expect(grbl.parseData('$10=800 (description)').messageType).to.equal('setting');
			expect(grbl.parseData('[messages]').messageType).to.equal('feedbackMessage');
			expect(grbl.parseData('<Idle,MPos,0,0,0,WPos,0,0,0,S,0,laser off,0>').messageType).to.equal('statusReport');
		})
		it('should have MPos, state, Wpos, S after a statusReport', function () {
			grbl.parseData('<Idle,MPos,200,200,10,WPos,100,100,2,S,1000,laser off,0>')

			expect(grbl.MPos).to.be.a('array');
			expect(grbl.MPos[0]).be.equal('200');
			expect(grbl.WPos).to.be.a('array');
			expect(grbl.WPos[0]).be.equal('100');
			expect(grbl.S).be.equal('1000');
		})
		it('should have settings after a settings message', function () {
			grbl.parseData('$12=1000 (description)')

			expect(grbl.settings['$12']).to.be.a('object');
			expect(grbl.settings['$12'].value).to.equal('1000');
			expect(grbl.settings['$12'].description).to.equal('description');

		})
	})
})