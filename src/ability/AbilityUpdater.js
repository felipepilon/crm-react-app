import { AbilityBuilder } from '@casl/ability';

export default (ability, user) => {
    const { can, cannot, rules } = new AbilityBuilder();

    console.log('AbilityUpdater', user)

    if (!user.authenticated) 
    {
        cannot('manage', 'all');
    }
    else if (user.role === 'Sys Admin') 
    {
        can('manage', 'all');
    }
    else if (user.role === 'Manager') 
    {

    }

    ability.update(rules);
};