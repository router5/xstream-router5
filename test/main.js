import { expect } from 'chai';
import { Stream } from 'xstream';
import { initialisePlugin, router } from './_helpers';

describe('xsPlugin', () => {
    before(() => {
        initialisePlugin();
    });

    it('should initialise observables', () => {
        expect(router.xs).to.exist;
    });

    it('should expose a route$ observable', () => {
        expect(router.xs.route$).to.be.instanceof(Stream);
    });

    it('should expose a routeNode observable factory', () => {
        expect(router.xs.routeNode('')).to.be.instanceof(Stream);
    });

    it('should expose a transitionError$ observable', () => {
        expect(router.xs.transitionError$).to.be.instanceof(Stream);
    });

    it('should expose a transitionRoute$ observable', () => {
        expect(router.xs.transitionRoute$).to.be.instanceof(Stream);
    });
});
