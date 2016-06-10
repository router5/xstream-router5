import xs from 'xstream';
import dropRepeats from 'xstream/extra/dropRepeats';
import transitionPath from 'router5.transition-path';

export const pluginName = 'XS_PLUGIN';

function xsPluginFactory() {
    function xsPlugin(router) {
        let listener;

        const dispatch = (type, isError) => (toState, fromState, error) => {
            if (listener) {
                const routerEvt = { type, toState, fromState };

                listener.next(isError ? { ...routerEvt, error } : routerEvt);
            }
        };

        let pluginMethods = {
            onStop: () => listener.complete(),
            onTransitionSuccess: dispatch('transitionSuccess'),
            onTransitionError: dispatch('transitionError', true),
            onTransitionStart: dispatch('transitionStart'),
            onTransitionCancel: dispatch('transitionCancel'),
        };

        // Events observable
        const transitionEvents$ = xs.create({
            start(l) {
                listener = l;
            },
            stop() {}
        });

        // Transition Route
        const transitionRoute$ = transitionEvents$
            .map(_ => _.type === 'transitionStart' ? _.toState : null)
            .startWith(null);

        // Error
        const transitionError$ = transitionEvents$
            .filter(_ => _.type )
            .map(_ => _.type === 'transitionError' ? _.error : null)
            .startWith(null)
            .compose(dropRepeats());

        // Route with intersection
        const routeState$ = transitionEvents$
            .filter(_ => _.type === 'transitionSuccess' && _.toState !== null)
            .map(({ toState, fromState }) => {
                const { intersection } =  transitionPath(toState, fromState);
                return { intersection, route: toState };
            })
            .startWith({ intersection: '', route: router.getState() });

        // Create a route observable
        const route$ = routeState$.map(({ route }) => route);

        // Create a route node observable
        const routeNode = (node) =>
            routeState$
                .filter(({ intersection }) => intersection === node)
                .map(({ route }) => route)
                .startWith(router.getState());

        // Expose observables
        router.xs = {
            route$,
            routeNode,
            transitionError$,
            transitionRoute$
        };

        return pluginMethods;
    }

    xsPlugin.pluginName = pluginName;

    return xsPlugin;
}

export default xsPluginFactory;
